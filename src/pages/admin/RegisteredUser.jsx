

// import React, { useEffect, useState } from "react";
// import { 
//   FaEnvelope, 
//   FaPhone, 
//   FaLinkedin, 
//   FaBriefcase, 
//   FaBuilding, 
//   FaCalendarAlt, 
//   FaClock, 
//   FaCheck, 
//   FaFilePdf,
//   FaFileExcel
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { Table, Modal, Button, Form, Dropdown } from "react-bootstrap";
// import axios from "axios";
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// const RegisteredUsers = () => {
//   const [showEdit, setShowEdit] = useState(false);
//   const [data, setData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalTitle, setModalTitle] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     profileImage: "",
//     phone: "",
//     linkedin: "",
//     program: "",
//     university: "",
//     skill: "",
//     password: "",
//     role: "student",
//   });
//   const [editId, setEditId] = useState(null);
//   const [viewData, setViewData] = useState(null);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loadingProfile, setLoadingProfile] = useState(false);

//   const exportToExcel = () => {
//     // Student data
//     const studentData = [{
//       'Name': viewData.name || viewData.fullName,
//       'Email': viewData.email,
//       'Phone': viewData.phone || 'N/A',
//       'LinkedIn': viewData.linkedin || 'N/A',
//       'Program': viewData.program || 'N/A',
//       'University': viewData.university || 'N/A',
//       'Skills': viewData.skill || 'N/A',
//       'Status': viewData.status === 1 ? "Active" : "Inactive"
//     }];

//     // Internship data
//     const internshipData = viewData.internships?.map(internship => ({
//       'Internship Title': internship.title,
//       'Company': internship.company?.name || 'N/A',
//       'Description': internship.description || 'N/A',
//       'Duration': internship.duration || 'N/A',
//       'Type': internship.type || 'N/A',
//       'Deadline': internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'N/A',
//       'Status': 'Approved',
//       'Application Date': internship.applicationDate ? new Date(internship.applicationDate).toLocaleDateString() : 'N/A'
//     })) || [];

//     const workbook = XLSX.utils.book_new();
    
//     // Student sheet
//     const studentWorksheet = XLSX.utils.json_to_sheet(studentData);
//     XLSX.utils.book_append_sheet(workbook, studentWorksheet, "Student Profile");
    
//     // Internships sheet
//     if (internshipData.length > 0) {
//       const internshipWorksheet = XLSX.utils.json_to_sheet(internshipData);
//       XLSX.utils.book_append_sheet(workbook, internshipWorksheet, "Internships");
//     }

//     XLSX.writeFile(workbook, `${viewData.name || viewData.fullName}_Report.xlsx`);
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
    
//     // Set document properties
//     doc.setProperties({
//       title: `${viewData.name || viewData.fullName}'s Report`,
//       subject: 'Student Profile Report',
//       author: 'CUI Internship Hub',
//       keywords: 'student, report, internship',
//       creator: 'CUI Internship Hub System'
//     });

//     // Add title page
//     doc.setFontSize(22);
//     doc.setTextColor(40, 53, 147);
//     doc.text('Student Profile Report', 105, 30, { align: 'center' });
    
//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Name: ${viewData.name || viewData.fullName}`, 105, 50, { align: 'center' });
//     doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 60, { align: 'center' });
    
//     // Add logo or image if available
//     if (viewData.profileImage) {
//       try {
//         const img = new Image();
//         img.src = `https://internship-hub-backend.vercel.app/${viewData.profileImage}`;
//         doc.addImage(img, 'JPEG', 80, 70, 50, 50);
//       } catch (e) {
//         console.log('Error adding profile image to PDF:', e);
//       }
//     }

//     // Student Profile
//     doc.addPage();
//     doc.setFontSize(18);
//     doc.setTextColor(40, 53, 147);
//     doc.text('Student Profile', 14, 20);
    
//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0);
    
//     // Basic Info
//     doc.autoTable({
//       startY: 30,
//       head: [['Field', 'Value']],
//       body: [
//         ['Name', viewData.name || viewData.fullName],
//         ['Email', viewData.email],
//         ['Phone', viewData.phone || 'N/A'],
//         ['LinkedIn', viewData.linkedin || 'N/A'],
//         ['Program', viewData.program || 'N/A'],
//         ['University', viewData.university || 'N/A'],
//         ['Skills', viewData.skill || 'N/A'],
//         ['Status', viewData.status === 1 ? "Active" : "Inactive"]
//       ],
//       styles: { 
//         fontSize: 10,
//         cellPadding: 3,
//         valign: 'middle'
//       },
//       headStyles: { 
//         fillColor: [41, 128, 185], 
//         textColor: 255,
//         fontStyle: 'bold'
//       },
//       alternateRowStyles: {
//         fillColor: [240, 240, 240]
//       },
//       margin: { top: 30 }
//     });

//     // Internships
//     if (viewData.internships?.length > 0) {
//       doc.addPage();
//       doc.setFontSize(18);
//       doc.setTextColor(40, 53, 147);
//       doc.text('Approved Internships', 14, 20);
      
//       viewData.internships.forEach((internship, index) => {
//         const startY = 30;
        
//         // Internship header
//         doc.setFontSize(14);
//         doc.text(`Internship #${index + 1}: ${internship.title}`, 14, startY);
        
//         // Internship details
//         doc.autoTable({
//           startY: startY + 10,
//           head: [['Detail', 'Information']],
//           body: [
//             ['Company', internship.company?.name || 'N/A'],
//             ['Description', internship.description || 'N/A'],
//             ['Duration', internship.duration || 'N/A'],
//             ['Type', internship.type || 'N/A'],
//             ['Deadline', internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'N/A'],
//             ['Application Date', internship.applicationDate ? new Date(internship.applicationDate).toLocaleDateString() : 'N/A'],
//             ['Status', 'Approved']
//           ],
//           styles: { fontSize: 10 },
//           headStyles: { fillColor: [41, 128, 185], textColor: 255 },
//           columnStyles: {
//             0: { cellWidth: 50 },
//             1: { cellWidth: 'auto' }
//           },
//           didDrawCell: (data) => {
//             if (data.section === 'body' && data.column.index === 1 && data.column.raw === 'Description') {
//               const text = doc.splitTextToSize(data.cell.raw, 140);
//               data.cell.text = text;
//               data.row.height = text.length * 5;
//             }
//           }
//         });
        
//         // Add space between internships
//         if (index < viewData.internships.length - 1) {
//           doc.addPage();
//         }
//       });
//     }

//     // Save the PDF
//     doc.save(`${viewData.name || viewData.fullName}_Report.pdf`);
//   };

//   const handleOpenModal = () => {
//     setFormData({ name: "", email: "", password: "", role: "" });
//     setEditId(null);
//     setModalTitle("Create New Student");
//     setShowModal(true);
//   };

//   const handleCloseModal = () => setShowModal(false);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`https://internship-hub-backend.vercel.app/api/users/${formData.role}`);
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const toggleStatus = async (id, currentStatus) => {
//     try {
//       const Status = currentStatus === 1 ? 0 : 1;
//       await axios.put(`https://internship-hub-backend.vercel.app/api/users/status/${id}`, { status: Status });
//       setData(prevData => prevData.map(item => 
//         item._id === id ? { ...item, status: Status } : item
//       ));
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://internship-hub-backend.vercel.app/api/users/${id}`);
//       setData(prevData => prevData.filter(item => item._id !== id));
//       alert("User deleted successfully");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("Failed to delete user. Please try again.");
//     }
//   };

//   const handleView = async (id) => {
//     try {
//       setLoadingProfile(true);
      
//       // Fetch all data in parallel
//       const [userResponse, profileResponse, stdres] = await Promise.all([
//         axios.get(`https://internship-hub-backend.vercel.app/api/users/${id}`),
//         axios.get(`https://internship-hub-backend.vercel.app/api/profiles/${id}`),
//         axios.get(`https://internship-hub-backend.vercel.app/api/profiles/student/${id}`)
//       ]);
      
//       // Combine the data
//       const combinedData = {
//         ...userResponse.data,
//         ...profileResponse.data,
//         ...stdres.data
//       };
      
//       setViewData(combinedData);
//     } catch (error) {
//       console.error("Error fetching student data:", error);
//       alert("Failed to load student profile. Please try again.");
//     } finally {
//       setLoadingProfile(false);
//       setShowViewModal(true);
//     }
//   };

//   const filteredData = data.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <section className="p-4 bg-white rounded">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="text-lg font-bold">Registered Students</h2>
//         <div className="d-flex">
//           <Form.Control
//             type="text"
//             placeholder="Search by name or email"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ width: "300px", marginRight: "10px" }}
//           />
//           <Dropdown>
//             <Dropdown.Toggle variant="success" id="dropdown-report">
//               Generate Report
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={exportToPDF}>PDF Report</Dropdown.Item>
//               <Dropdown.Item onClick={exportToExcel}>Excel Report</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>
//       <Button
//         hidden
//         variant="primary"
//         onClick={handleOpenModal}
//         style={{ marginBottom: "10px", float: "right" }}
//       >
//         + Add Student
//       </Button>

//       <div className="overflow-x-auto">
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{index + 1}</td>
//                 <td>{item.name}</td>
//                 <td>{item.email}</td>
//                 <td>{item.role}</td>
//                 <td>
//                   <span
//                     style={{
//                       color: item.status === 1 ? "green" : "#dc3545",
//                       fontWeight: "bold",
//                       marginRight: "5px",
//                     }}
//                   >
//                     {item.status === 1 ? "Active" : "Inactive"}
//                   </span>
//                   <button
//                     className="btn btn-primary btn-sm"
//                     onClick={() => toggleStatus(item._id, item.status)}
//                   >
//                     Toggle Status
//                   </button>
//                 </td>
//                 <td>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDelete(item._id)}
//                   >
//                     Delete
//                   </Button>{" "}
//                   <Button
//                     variant="info"
//                     size="sm"
//                     onClick={() => handleView(item._id)}
//                     disabled={loadingProfile}
//                   >
//                     {loadingProfile ? 'Loading...' : 'View'}
//                   </Button>{" "}
//                   <Link
//                     to={`/admin/report/${item._id}`}
//                     className="btn btn-primary btn-sm"
//                   >
//                     View Report
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       <Modal size="xl" show={showViewModal} onHide={() => setShowViewModal(false)}>
//         <Modal.Header closeButton className="bg-gradient-to-r from-blue-950 to-blue-600 text-white">
//           <Modal.Title className="text-xl font-bold">Student Profile Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="bg-gray-50 p-0">
//           {viewData ? (
//             <div className="min-h-screen">
//               {/* Header Section */}
//               <div className="bg-gradient-to-r from-blue-950 to-blue-600 text-white shadow-lg">
//                 <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
//                   <div className="flex items-center mb-4 md:mb-0">
//                     <img
//                       src="/src/assets/images/fyplogo1.png"
//                       alt="Logo"
//                       className="w-16 h-16 rounded-full border-2 border-white mr-4"
//                     />
//                     <h1 className="text-2xl font-bold">CUI Internship Hub</h1>
//                   </div>
//                   <div className="text-center md:text-right">
//                     <h2 className="text-xl font-semibold">{viewData.fullName || viewData.name}'s Profile</h2>
//                     <p className="text-blue-100 text-sm">{viewData.email}</p>
//                   </div>
//                   <div className="relative mb-4">
//                     <img
//                       src={viewData.profileImage ? 
//                         `https://internship-hub-backend.vercel.app/${viewData.profileImage}` : 
//                         'https://placehold.co/150x150'}
//                       alt="Profile"
//                       className="w-28 h-28 rounded-full border-4 border-blue-100 object-cover"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Main Content */}
//               <div className="container mx-auto px-4 py-8">
//                 {/* Profile Card */}
//                 <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//                   <div className="p-6 md:p-8">
//                     <div className="flex flex-col md:flex-row gap-8">
//                       {/* Profile Picture Section */}
//                       <div className="w-full md:w-1/4 flex flex-col items-center">
//                         <div className="bg-blue-950 p-4 rounded-lg w-full">
//                           <div className="bg-blue-200 p-9 rounded-lg">
//                             <h3 className="text-lg font-bold text-blue-800 mb-2 mt-0">Contact Information</h3>
//                             <div className="space-y-6">
//                               <div className="flex items-center">
//                                 <FaEnvelope className="text-blue-500 mr-2" />
//                                 <span className="text-sm">{viewData.email}</span>
//                               </div>
//                               {viewData.phone && (
//                                 <div className="flex items-center">
//                                   <FaPhone className="text-blue-500 mr-2" />
//                                   <span className="text-sm">{viewData.phone}</span>
//                                 </div>
//                               )}
//                               {viewData.linkedin && (
//                                 <div className="flex items-center">
//                                   <FaLinkedin className="text-blue-500 mr-2" />
//                                   <a 
//                                     href={viewData.linkedin} 
//                                     target="_blank" 
//                                     rel="noopener noreferrer" 
//                                     className="text-sm text-blue-600 hover:underline"
//                                   >
//                                     LinkedIn Profile
//                                   </a>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Profile Details Section */}
//                       <div className="w-full md:w-3/4">
//                         <div className="space-y-6">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="bg-blue-950 p-4 rounded-lg">
//                               <div className="bg-blue-200 p-2 rounded-lg">
//                                 <h3 className="text-lg font-bold text-blue-800 mb-2">Academic Information</h3>
//                                 <div className="space-y-3">
//                                   <div>
//                                     <p className="text-medium font-bold text-gray-800">Program</p>
//                                     <p className="font-sm">{viewData.program || 'Not specified'}</p>
//                                   </div>
//                                   <div>
//                                     <p className="text-medium font-bold text-gray-800">University</p>
//                                     <p className="font-sm">{viewData.university || 'Not specified'}</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="bg-blue-950 p-4 rounded-lg">
//                               <div className="bg-blue-200 p-12 rounded-lg">
//                                 <h3 className="text-lg font-bold text-blue-800 mb-2">Professional Information</h3>
//                                 <div className="space-y-3">
//                                   <div>
//                                     <p className="text-medium font-bold text-gray-800">Skills</p>
//                                     {viewData.skill ? (
//                                       <div className="flex flex-wrap gap-2 mt-1">
//                                         {viewData.skill.split(',').map((skill, idx) => (
//                                           <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
//                                             {skill.trim()}
//                                           </span>
//                                         ))}
//                                       </div>
//                                     ) : (
//                                       <p className="font-medium text-sm">No skills listed</p>
//                                     )}
//                                   </div>
//                                   <div>
//                                     <p className="text-medium font-bold text-gray-800">Status</p>
//                                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                                       viewData.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                                     }`}>
//                                       {viewData.status === 1 ? "Active" : "Inactive"}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Internships Section */}
//                 {viewData.internships && viewData.internships.length > 0 && (
//                   <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//                     <div className="p-6 md:p-8">
//                       <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold text-gray-800">Approved Internships</h2>
//                         <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                           {viewData.internships.length} {viewData.internships.length === 1 ? 'Internship' : 'Internships'}
//                         </span>
//                       </div>
//                       <div className="space-y-4">
//                         {viewData.internships.map((internship) => (
//                           <div key={internship._id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
//                             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                               <div className="mb-4 md:mb-0">
//                                 <h3 className="text-lg font-bold text-gray-800 flex items-center">
//                                   <FaBriefcase className="text-blue-500 mr-2" />
//                                   {internship.title || 'Internship Position'}
//                                 </h3>
//                                 <p className="text-gray-600 mt-1 flex items-center">
//                                   <FaBuilding className="text-gray-400 mr-2" />
//                                   {internship.company?.name || 'Unknown Company'}
//                                 </p>
//                               </div>
//                               <div className="flex flex-col sm:flex-row gap-3">
//                                 <div className="flex items-center text-sm text-gray-500">
//                                   <FaCalendarAlt className="mr-2" />
//                                   {internship.duration || 'Duration not specified'}
//                                 </div>
//                                 <div className="flex items-center text-sm text-gray-500">
//                                   <FaClock className="mr-2" />
//                                   {internship.type || 'Type not specified'}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="mt-4">
//                               <p className="text-gray-700 mb-3">
//                                 {internship.description || 'No description available'}
//                               </p>
//                             </div>
//                             <div className="mt-4 flex justify-between items-center">
//                               <div className="text-sm text-gray-500">
//                                 {internship.applicationDate && (
//                                   <>Applied on: {new Date(internship.applicationDate).toLocaleDateString()}</>
//                                 )}
//                               </div>
//                               <span className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                 <FaCheck className="mr-1" /> Approved
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer className="bg-gray-100">
//           <Dropdown>
//             <Dropdown.Toggle variant="primary" id="dropdown-report">
//               <FaFilePdf className="mr-2" /> Generate Report
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={exportToPDF}>
//                 <FaFilePdf className="mr-2" /> PDF Report
//               </Dropdown.Item>
//               <Dropdown.Item onClick={exportToExcel}>
//                 <FaFileExcel className="mr-2" /> Excel Report
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//           <Button 
//             variant="secondary" 
//             onClick={() => setShowViewModal(false)}
//             className="bg-blue-600 hover:bg-blue-700 text-white"
//           >
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </section>
//   );
// };

// export default RegisteredUsers;



import React, { useEffect, useState } from "react";
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
  FaFileExcel
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Table, Modal, Button, Form, Dropdown } from "react-bootstrap";
import axios from "axios";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const RegisteredUsers = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    phone: "",
    linkedin: "",
    program: "",
    university: "",
    skill: "",
    password: "",
    role: "student",
  });
  const [editId, setEditId] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);

  const exportToExcel = () => {
    const studentData = [{
      'Name': viewData.name || viewData.fullName,
      'Email': viewData.email,
      'Phone': viewData.phone || 'N/A',
      'LinkedIn': viewData.linkedin || 'N/A',
      'Program': viewData.program || 'N/A',
      'University': viewData.university || 'N/A',
      'Skills': viewData.skill || 'N/A',
      'Status': viewData.status === 1 ? "Active" : "Inactive"
    }];

    const internshipData = viewData.internships?.map(internship => ({
      'Internship Title': internship.title,
      'Company': internship.company?.name || 'N/A',
      'Description': internship.description || 'N/A',
      'Duration': internship.duration || 'N/A',
      'Type': internship.type || 'N/A',
      'Deadline': internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'N/A',
      'Status': 'Approved',
      'Application Date': internship.applicationDate ? new Date(internship.applicationDate).toLocaleDateString() : 'N/A'
    })) || [];

    const workbook = XLSX.utils.book_new();
    const studentWorksheet = XLSX.utils.json_to_sheet(studentData);
    XLSX.utils.book_append_sheet(workbook, studentWorksheet, "Student Profile");
    if (internshipData.length > 0) {
      const internshipWorksheet = XLSX.utils.json_to_sheet(internshipData);
      XLSX.utils.book_append_sheet(workbook, internshipWorksheet, "Internships");
    }
    XLSX.writeFile(workbook, `${viewData.name || viewData.fullName}_Report.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setProperties({
      title: `${viewData.name || viewData.fullName}'s Report`,
      subject: 'Student Profile Report',
      author: 'CUI Internship Hub',
      keywords: 'student, report, internship',
      creator: 'CUI Internship Hub System'
    });
    doc.setFontSize(22);
    doc.setTextColor(40, 53, 147);
    doc.text('Student Profile Report', 105, 30, { align: 'center' });
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${viewData.name || viewData.fullName}`, 105, 50, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 60, { align: 'center' });
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
        ['Name', viewData.name || viewData.fullName],
        ['Email', viewData.email],
        ['Phone', viewData.phone || 'N/A'],
        ['LinkedIn', viewData.linkedin || 'N/A'],
        ['Program', viewData.program || 'N/A'],
        ['University', viewData.university || 'N/A'],
        ['Skills', viewData.skill || 'N/A'],
        ['Status', viewData.status === 1 ? "Active" : "Inactive"]
      ],
      styles: { fontSize: 10, cellPadding: 3, valign: 'middle' },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 30 }
    });
    if (viewData.internships?.length > 0) {
      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(40, 53, 147);
      doc.text('Approved Internships', 14, 20);
      viewData.internships.forEach((internship, index) => {
        const startY = 30;
        doc.setFontSize(14);
        doc.text(`Internship #${index + 1}: ${internship.title}`, 14, startY);
        doc.autoTable({
          startY: startY + 10,
          head: [['Detail', 'Information']],
          body: [
            ['Company', internship.company?.name || 'N/A'],
            ['Description', internship.description || 'N/A'],
            ['Duration', internship.duration || 'N/A'],
            ['Type', internship.type || 'N/A'],
            ['Deadline', internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'N/A'],
            ['Application Date', internship.applicationDate ? new Date(internship.applicationDate).toLocaleDateString() : 'N/A'],
            ['Status', 'Approved']
          ],
          styles: { fontSize: 10 },
          headStyles: { fillColor: [41, 128, 185], textColor: 255 },
          columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 'auto' } },
          didDrawCell: (data) => {
            if (data.section === 'body' && data.column.index === 1 && data.column.raw === 'Description') {
              const text = doc.splitTextToSize(data.cell.raw, 140);
              data.cell.text = text;
              data.row.height = text.length * 5;
            }
          }
        });
        if (index < viewData.internships.length - 1) {
          doc.addPage();
        }
      });
    }
    doc.save(`${viewData.name || viewData.fullName}_Report.pdf`);
  };

  const handleOpenModal = () => {
    setFormData({ name: "", email: "", password: "", role: "" });
    setEditId(null);
    setModalTitle("Create New Student");
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://internship-hub-backend.vercel.app/api/users/${formData.role}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const Status = currentStatus === 1 ? 0 : 1;
      await axios.put(`https://internship-hub-backend.vercel.app/api/users/status/${id}`, { status: Status });
      setData(prevData => prevData.map(item => 
        item._id === id ? { ...item, status: Status } : item
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://internship-hub-backend.vercel.app/api/users/${id}`);
      setData(prevData => prevData.filter(item => item._id !== id));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleView = async (id) => {
    try {
      setLoadingProfile(true);
      const [userResponse, profileResponse, stdres] = await Promise.all([
        axios.get(`https://internship-hub-backend.vercel.app/api/users/${id}`),
        axios.get(`https://internship-hub-backend.vercel.app/api/profiles/${id}`),
        axios.get(`https://internship-hub-backend.vercel.app/api/profiles/student/${id}`)
      ]);
      const combinedData = {
        ...userResponse.data,
        ...profileResponse.data,
        ...stdres.data
      };
      setViewData(combinedData);
    } catch (error) {
      console.error("Error fetching student data:", error);
      alert("Failed to load student profile. Please try again.");
    } finally {
      setLoadingProfile(false);
      setShowViewModal(true);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="p-4 bg-white rounded">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
        <h2 className="text-lg font-bold mb-0">Registered Students</h2>
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center w-100 w-sm-auto gap-2">
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-100"
          />
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-report"
              size="sm"
              className="w-100 w-sm-auto px-3 py-2"
            >
              Generate Report
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
        </div>
      </div>
      <Button
        hidden
        variant="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: "10px", float: "right" }}
      >
        + Add Student
      </Button>

      <div className="overflow-x-auto">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <span
                    style={{
                      color: item.status === 1 ? "green" : "#dc3545",
                      fontWeight: "bold",
                      marginRight: "5px",
                    }}
                  >
                    {item.status === 1 ? "Active" : "Inactive"}
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => toggleStatus(item._id, item.status)}
                  >
                    Toggle Status
                  </button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleView(item._id)}
                    disabled={loadingProfile}
                  >
                    {loadingProfile ? 'Loading...' : 'View'}
                  </Button>{" "}
                  <Link
                    to={`/admin/report/${item._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal size="xl" show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton className="bg-gradient-to-r from-blue-950 to-blue-600 text-white">
          <Modal.Title className="text-xl font-bold">Student Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-50 p-0">
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
                    <h2 className="text-xl font-semibold">{viewData.fullName || viewData.name}'s Profile</h2>
                    <p className="text-blue-100 text-sm">{viewData.email}</p>
                  </div>
                  <div className="relative mb-4">
                    <img
                      src={viewData.profileImage ? 
                        `https://internship-hub-backend.vercel.app/${viewData.profileImage}` : 
                        'https://placehold.co/150x150'}
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
                      {/* Profile Picture Section */}
                      <div className="w-full md:w-1/4 flex flex-col items-center">
                        <div className="bg-blue-950 p-4 rounded-lg w-full">
                          <div className="bg-blue-200 p-9 rounded-lg">
                            <h3 className="text-lg font-bold text-blue-800 mb-2 mt-0">Contact Information</h3>
                            <div className="space-y-6">
                              <div className="flex items-center">
                                <FaEnvelope className="text-blue-500 mr-2" />
                                <span className="text-sm">{viewData.email}</span>
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

                      {/* Profile Details Section */}
                      <div className="w-full md:w-3/4">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-950 p-4 rounded-lg">
                              <div className="bg-blue-200 p-2 rounded-lg">
                                <h3 className="text-lg font-bold text-blue-800 mb-2">Academic Information</h3>
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-medium font-bold text-gray-800">Program</p>
                                    <p className="font-sm">{viewData.program || 'Not specified'}</p>
                                  </div>
                                  <div>
                                    <p className="text-medium font-bold text-gray-800">University</p>
                                    <p className="font-sm">{viewData.university || 'Not specified'}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-blue-950 p-4 rounded-lg">
                              <div className="bg-blue-200 p-12 rounded-lg">
                                <h3 className="text-lg font-bold text-blue-800 mb-2">Professional Information</h3>
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-medium font-bold text-gray-800">Skills</p>
                                    {viewData.skill ? (
                                      <div className="flex flex-wrap gap-2 mt-1">
                                        {viewData.skill.split(',').map((skill, idx) => (
                                          <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                                            {skill.trim()}
                                          </span>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="font-medium text-sm">No skills listed</p>
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-medium font-bold text-gray-800">Status</p>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      viewData.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                      {viewData.status === 1 ? "Active" : "Inactive"}
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
                        <h2 className="text-2xl font-bold text-gray-800">Approved Internships</h2>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {viewData.internships.length} {viewData.internships.length === 1 ? 'Internship' : 'Internships'}
                        </span>
                      </div>
                      <div className="space-y-4">
                        {viewData.internships.map((internship) => (
                          <div key={internship._id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
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
                                  <>Applied on: {new Date(internship.applicationDate).toLocaleDateString()}</>
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
        </Modal.Body>
        <Modal.Footer className="bg-gray-100 d-flex flex-column flex-sm-row justify-content-end gap-2">
          <Dropdown>
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-report"
              size="sm"
              className="w-100 w-sm-auto px-3 py-2"
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
          <Button 
            variant="secondary" 
            onClick={() => setShowViewModal(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-100 w-sm-auto px-3 py-2"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default RegisteredUsers;