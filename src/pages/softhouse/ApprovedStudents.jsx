import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Alert, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaClock,
  FaCheck,
  FaFilePdf,
  FaFileExcel,
} from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Applications = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState({
    technicalSkills: '',
    taskCompletion: '',
    learningAbility: '',
    communicationSkills: '',
    teamCollaboration: '',
    punctualityAttendance: '',
    professionalism: '',
    creativityInitiative: '',
    behaviorAttitude: '',
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const companyId = localStorage.getItem('companyId');
  const navigate = useNavigate();

  // Fetch approved applications
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://internship-hub-backend.vercel.app/api/applications/${companyId}`);
      const approvedApplications = response.data.filter((item) => item.status === 1); // Filter only approved
      console.log('Approved applications:', approvedApplications);
      setData(approvedApplications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      toast.error('Failed to load applications.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // View student profile (aligned with previous response, no achievements)
  const viewProfile = async (studentId) => {
    try {
      setLoadingProfile(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No auth token found, please login');
      }

      // Fetch user, profile, and student data in parallel
      const [userResponse, profileResponse, studentResponse] = await Promise.all([
        axios.get(`https://internship-hub-backend.vercel.app/api/users/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`https://internship-hub-backend.vercel.app/api/profiles/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`https://internship-hub-backend.vercel.app/api/profiles/student/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Combine the data
      const combinedData = {
        ...userResponse.data,
        ...profileResponse.data,
        ...studentResponse.data,
      };

      setViewData(combinedData);
      setShowViewModal(true);
      toast.success('Student profile loaded successfully!');
    } catch (error) {
      console.error('Error fetching student data:', error.response?.data || error.message);
      toast.error('Failed to load student profile. Please try again.');
    } finally {
      setLoadingProfile(false);
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    if (!viewData) return;

    const studentData = [
      {
        Name: viewData.name || viewData.fullName || 'N/A',
        Email: viewData.email || 'N/A',
        Phone: viewData.phone || 'N/A',
        LinkedIn: viewData.linkedin || 'N/A',
        Program: viewData.program || 'N/A',
        University: viewData.university || 'N/A',
        Skills: viewData.skill || 'N/A',
        Status: viewData.status === 1 ? 'Active' : 'Inactive',
      },
    ];

    const internshipData = viewData.internships?.map((internship) => ({
      'Internship Title': internship.title || 'N/A',
      Company: internship.company?.name || 'N/A',
      Description: internship.description || 'N/A',
      Duration: internship.duration || 'N/A',
      Type: internship.type || 'N/A',
      Deadline: internship.deadline
        ? new Date(internship.deadline).toLocaleDateString()
        : 'N/A',
      Status: 'Approved',
      'Application Date': internship.applicationDate
        ? new Date(internship.applicationDate).toLocaleDateString()
        : 'N/A',
    })) || [];

    const workbook = XLSX.utils.book_new();
    const studentWorksheet = XLSX.utils.json_to_sheet(studentData);
    XLSX.utils.book_append_sheet(workbook, studentWorksheet, 'Student Profile');
    if (internshipData.length > 0) {
      const internshipWorksheet = XLSX.utils.json_to_sheet(internshipData);
      XLSX.utils.book_append_sheet(workbook, internshipWorksheet, 'Internships');
    }

    XLSX.writeFile(workbook, `${viewData.name || viewData.fullName || 'Student'}_Report.xlsx`);
    toast.success('Excel report generated successfully!');
  };

  // Export to PDF
  const exportToPDF = () => {
    if (!viewData) return;

    const doc = new jsPDF();
    doc.setProperties({
      title: `${viewData.name || viewData.fullName || 'Student'}'s Report`,
      subject: 'Student Profile Report',
      author: 'CUI Internship Hub',
      keywords: 'student, report, internship',
      creator: 'CUI Internship Hub System',
    });

    doc.setFontSize(22);
    doc.setTextColor(40, 53, 147);
    doc.text('Student Profile Report', 105, 30, { align: 'center' });
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${viewData.name || viewData.fullName || 'N/A'}`, 105, 50, {
      align: 'center',
    });
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 60, {
      align: 'center',
    });

    if (viewData.profileImage) {
      try {
        const img = new Image();
        img.src = `https://internship-hub-backend.vercel.app/${viewData.profileImage}`;
        doc.addImage(img, 'JPEG', 80, 70, 50, 50);
      } catch (e) {
        console.log('Error adding profile image to PDF:', e);
      }
    }

    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(40, 53, 147);
    doc.text('Student Profile', 14, 20);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.autoTable({
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Name', viewData.name || viewData.fullName || 'N/A'],
        ['Email', viewData.email || 'N/A'],
        ['Phone', viewData.phone || 'N/A'],
        ['LinkedIn', viewData.linkedin || 'N/A'],
        ['Program', viewData.program || 'N/A'],
        ['University', viewData.university || 'N/A'],
        ['Skills', viewData.skill || 'N/A'],
        ['Status', viewData.status === 1 ? 'Active' : 'Inactive'],
      ],
      styles: { fontSize: 10, cellPadding: 3, valign: 'middle' },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 30 },
    });

    if (viewData.internships?.length > 0) {
      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(40, 53, 147);
      doc.text('Approved Internships', 14, 20);

      viewData.internships.forEach((internship, index) => {
        const startY = 30;
        doc.setFontSize(14);
        doc.text(`Internship #${index + 1}: ${internship.title || 'N/A'}`, 14, startY);
        doc.autoTable({
          startY: startY + 10,
          head: [['Detail', 'Information']],
          body: [
            ['Company', internship.company?.name || 'N/A'],
            ['Description', internship.description || 'N/A'],
            ['Duration', internship.duration || 'N/A'],
            ['Type', internship.type || 'N/A'],
            [
              'Deadline',
              internship.deadline
                ? new Date(internship.deadline).toLocaleDateString()
                : 'N/A',
            ],
            [
              'Application Date',
              internship.applicationDate
                ? new Date(internship.applicationDate).toLocaleDateString()
                : 'N/A',
            ],
            ['Status', 'Approved'],
          ],
          styles: { fontSize: 10 },
          headStyles: { fillColor: [41, 128, 185], textColor: 255 },
          columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 'auto' } },
          didDrawCell: (data) => {
            if (
              data.section === 'body' &&
              data.column.index === 1 &&
              data.column.raw === 'Description'
            ) {
              const text = doc.splitTextToSize(data.cell.raw, 140);
              data.cell.text = text;
              data.row.height = text.length * 5;
            }
          },
        });

        if (index < viewData.internships.length - 1) {
          doc.addPage();
        }
      });
    }

    doc.save(`${viewData.name || viewData.fullName || 'Student'}_Report.pdf`);
    toast.success('PDF report generated successfully!');
  };

  const handleRemarksClick = (stdid) => {
    console.log('selectedStudent', stdid);
    setSelectedStudent(stdid);
    setShowModal(true);
  };

  const handleSubmitRemarks = async () => {
    try {
      setLoading(true);
      const payload = {
        remarks,
        evaluation,
      };

      await axios.post(`https://internship-hub-backend.vercel.app/api/remarks/${selectedStudent}`, payload);

      setAlertMessage({ type: 'success', text: 'Remarks submitted successfully!' });

      fetchData();
      setShowModal(false);
      setRemarks('');
      setEvaluation({
        technicalSkills: '',
        taskCompletion: '',
        learningAbility: '',
        communicationSkills: '',
        teamCollaboration: '',
        punctualityAttendance: '',
        professionalism: '',
        creativityInitiative: '',
        behaviorAttitude: '',
      });
    } catch (error) {
      console.error('Error submitting remarks:', error);
      setAlertMessage({ type: 'danger', text: 'Failed to submit remarks. Please try again.' });
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleEvaluationChange = (e) => {
    const { name, value } = e.target;
    setEvaluation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseAlert = () => setAlertMessage(null);

  const formatFieldName = (field) => {
    return field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <section className="bg-white p-4 rounded shadow-sm">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-lg font-bold mb-4">Approved Applications</h2>

      {/* Display alert if there's a message */}
      {alertMessage && (
        <Alert variant={alertMessage.type} onClose={handleCloseAlert} dismissible>
          {alertMessage.text}
        </Alert>
      )}

      <div className="overflow-x-auto">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.internship?.title || 'N/A'}</td>
                <td>{item.user?.name || 'N/A'}</td>
                <td>{item.user?.email || 'N/A'}</td>
                <td>{item.internship?.type || 'N/A'}</td>
                <td>
                  <span
                    style={{
                      color: item.status === 1 ? 'green' : '#dc3545',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.status === 1 ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="space-x-2">
                  <Button
                    onClick={() => viewProfile(item.studentId)}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                    disabled={loadingProfile}
                  >
                    {loadingProfile ? 'Loading...' : 'View Profile'}
                  </Button>
                  <Button
                    onClick={() => handleRemarksClick(item.studentId)}
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      marginLeft: '10px',
                    }}
                  >
                    Remarks
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Remarks Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="h5">Student Evaluation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Overall Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Provide overall feedback about the student's performance..."
                className="border-2"
              />
              <Form.Text className="text-muted">
                This will be included in the student's certificate
              </Form.Text>
            </Form.Group>

            <h5 className="mb-3 fw-bold border-bottom pb-2">Performance Evaluation</h5>
            <div className="row g-3">
              {Object.keys(evaluation).map((field) => (
                <div className="col-md-6" key={field}>
                  <Form.Group>
                    <Form.Label>{formatFieldName(field)}</Form.Label>
                    <Form.Select
                      name={field}
                      value={evaluation[field]}
                      onChange={handleEvaluationChange}
                      className="border-2"
                      required
                    >
                      <option value="">Select rating</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Average">Average</option>
                      <option value="Poor">Poor</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitRemarks} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Evaluation'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Profile View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-950 to-blue-600 text-white">
              <h3 className="text-xl font-bold">Student Profile Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="bg-gray-50">
              {viewData ? (
                <div className="min-h-screen">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-blue-950 to-blue-600 text-white shadow-lg">
                    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <img
                          src="/src/assets/images/fyplogo1.png"
                          alt="Logo"
                          className="w-16 h-16 rounded-full border-2 border-white mr-4"
                        />
                        <h1 className="text-2xl font-bold">CUI Internship Hub</h1>
                      </div>
                      <div className="text-center md:text-right">
                        <h2 className="text-xl font-semibold">
                          {viewData.fullName || viewData.name || 'Student'}'s Profile
                        </h2>
                        <p className="text-blue-100 text-sm">{viewData.email || 'N/A'}</p>
                      </div>
                      <div className="relative mb-4">
                        <img
                          src={
                            viewData.profileImage
                              ? `https://internship-hub-backend.vercel.app/${viewData.profileImage}`
                              : 'https://placehold.co/150x150'
                          }
                          alt="Profile"
                          className="w-28 h-28 rounded-full border-4 border-blue-100 object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="container mx-auto px-4 py-8">
                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                      <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                          {/* Contact Information */}
                          <div className="w-full md:w-1/4 flex flex-col items-center">
                            <div className="bg-blue-950 p-4 rounded-lg w-full">
                              <div className="bg-blue-200 p-6 rounded-lg">
                                <h3 className="text-lg font-bold text-blue-800 mb-4">
                                  Contact Information
                                </h3>
                                <div className="space-y-4">
                                  <div className="flex items-center">
                                    <FaEnvelope className="text-blue-500 mr-2" />
                                    <span className="text-sm">{viewData.email || 'N/A'}</span>
                                  </div>
                                  {viewData.phone && (
                                    <div className="flex items-center">
                                      <FaPhone className="text-blue-500 mr-2" />
                                      <span className="text-sm">{viewData.phone}</span>
                                    </div>
                                  )}
                                  {viewData.linkedin && (
                                    <div className="flex items-center">
                                      <FaLinkedin className="text-blue-500 mr-2" />
                                      <a
                                        href={viewData.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline"
                                      >
                                        LinkedIn Profile
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Profile Details */}
                          <div className="w-full md:w-3/4">
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Academic Information */}
                                <div className="bg-blue-950 p-4 rounded-lg">
                                  <div className="bg-blue-200 p-4 rounded-lg">
                                    <h3 className="text-lg font-bold text-blue-800 mb-4">
                                      Academic Information
                                    </h3>
                                    <div className="space-y-3">
                                      <div>
                                        <p className="text-medium font-bold text-gray-800">Program</p>
                                        <p className="text-sm">
                                          {viewData.program || 'Not specified'}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-medium font-bold text-gray-800">
                                          University
                                        </p>
                                        <p className="text-sm">
                                          {viewData.university || 'Not specified'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* Professional Information */}
                                <div className="bg-blue-950 p-4 rounded-lg">
                                  <div className="bg-blue-200 p-4 rounded-lg">
                                    <h3 className="text-lg font-bold text-blue-800 mb-4">
                                      Professional Information
                                    </h3>
                                    <div className="space-y-3">
                                      <div>
                                        <p className="text-medium font-bold text-gray-800">Skills</p>
                                        {viewData.skill ? (
                                          <div className="flex flex-wrap gap-2 mt-1">
                                            {viewData.skill.split(',').map((skill, idx) => (
                                              <span
                                                key={idx}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
                                              >
                                                {skill.trim()}
                                              </span>
                                            ))}
                                          </div>
                                        ) : (
                                          <p className="text-sm">No skills listed</p>
                                        )}
                                      </div>
                                      <div>
                                        <p className="text-medium font-bold text-gray-800">Status</p>
                                        <span
                                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            viewData.status === 1
                                              ? 'bg-green-100 text-green-800'
                                              : 'bg-red-100 text-red-800'
                                          }`}
                                        >
                                          {viewData.status === 1 ? 'Active' : 'Inactive'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Internships Section */}
                    {viewData.internships && viewData.internships.length > 0 && (
                      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                        <div className="p-6 md:p-8">
                          <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                              Approved Internships
                            </h2>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {viewData.internships.length}{' '}
                              {viewData.internships.length === 1 ? 'Internship' : 'Internships'}
                            </span>
                          </div>
                          <div className="space-y-4">
                            {viewData.internships.map((internship) => (
                              <div
                                key={internship._id}
                                className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors"
                              >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                  <div className="mb-4 md:mb-0">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                      <FaBriefcase className="text-blue-500 mr-2" />
                                      {internship.title || 'Internship Position'}
                                    </h3>
                                    <p className="text-gray-600 mt-1 flex items-center">
                                      <FaBuilding className="text-gray-400 mr-2" />
                                      {internship.company?.name || 'Unknown Company'}
                                    </p>
                                  </div>
                                  <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex items-center text-sm text-gray-500">
                                      <FaCalendarAlt className="mr-2" />
                                      {internship.duration || 'Duration not specified'}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                      <FaClock className="mr-2" />
                                      {internship.type || 'Type not specified'}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <p className="text-gray-700 mb-3">
                                    {internship.description || 'No description available'}
                                  </p>
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                  <div className="text-sm text-gray-500">
                                    {internship.applicationDate && (
                                      <>
                                        Applied on:{' '}
                                        {new Date(internship.applicationDate).toLocaleDateString()}
                                      </>
                                    )}
                                  </div>
                                  <span className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <FaCheck className="mr-1" /> Approved
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-100 space-x-3">
              <Dropdown>
                <Dropdown.Toggle
                  className="!bg-blue-600 !text-white hover:!bg-blue-700 !flex !items-center"
                  id="dropdown-report"
                >
                  <FaFilePdf className="mr-2" /> Generate Report
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={exportToPDF}>
                    <FaFilePdf className="mr-2" /> PDF Report
                  </Dropdown.Item>
                  <Dropdown.Item onClick={exportToExcel}>
                    <FaFileExcel className="mr-2" /> Excel Report
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => navigate(`/student/profile/${viewData._id}`)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Applications;