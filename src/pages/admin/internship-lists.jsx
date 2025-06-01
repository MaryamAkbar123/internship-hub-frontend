



// import React, { useState, useEffect } from "react";
// import { Table, Button, Badge, Dropdown, Spinner, Modal, Form } from "react-bootstrap";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { Link } from "react-router-dom";

// const StudentInternshipDetails = () => {
//   const [internshipData, setInternshipData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [formData, setFormData] = useState({
//     studentName: "",
//     companyName: "",
//     internshipTitle: "",
//     jobType: "",
//     duration: "",
//     status: "Pending",
//     description: ""
//   });

//   // Status badge colors
//   const statusVariant = {
//     Approved: "success",
//     Pending: "warning",
//     Rejected: "danger"
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // First fetch all internships
//         const internshipsResponse = await axios.get("http://localhost:5000/api/internships");
//         const internships = internshipsResponse.data;
        
//         // Fetch additional details for each internship
//         const enrichedInternships = await Promise.all(
//           internships.map(async (internship) => {
//             try {
//               // Fetch company details
//               const companyResponse = await axios.get(
//                 `http://localhost:5000/api/softwarehouses/${internship.companyId}`
//               );
              
//               // Fetch students for this internship
//               const studentsResponse = await axios.get(
//                 `http://localhost:5000/api/internships/${internship._id}/students`
//               );
              
//               return {
//                 ...internship,
//                 companyName: companyResponse.data?.name || 'Unknown Company',
//                 companyLogo: companyResponse.data?.logo || '',
//                 students: studentsResponse.data?.map(student => ({
//                   ...student,
//                   internshipTitle: internship.title,
//                   internshipDescription: internship.description,
//                   internshipDuration: internship.duration,
//                   internshipType: internship.type,
//                   internshipStatus: internship.status
//                 })) || []
//               };
//             } catch (err) {
//               console.error(`Error fetching details for internship ${internship._id}:`, err);
//               return {
//                 ...internship,
//                 companyName: 'Unknown Company',
//                 companyLogo: '',
//                 students: []
//               };
//             }
//           })
//         );

//         setInternshipData(enrichedInternships);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching internships:", err);
//         setError(err.response?.data?.message || err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Flatten the data to have one row per student
//   const flattenedData = internshipData.flatMap(internship => 
//     internship.students.map(student => ({
//       ...student,
//       internshipId: internship._id,
//       companyName: internship.companyName,
//       companyLogo: internship.companyLogo,
//       internshipTitle: internship.title,
//       internshipDescription: internship.description,
//       internshipDuration: internship.duration,
//       internshipType: internship.type,
//       internshipStatus: internship.status
//     }))
//   );
  

//   // Filter function for flattened data
//   const filteredData = flattenedData.filter((student) => {
//     const searchLower = searchTerm.toLowerCase();
    
//     const studentMatch = 
//       (student.name || '').toLowerCase().includes(searchLower) ||
//       (student.email || '').toLowerCase().includes(searchLower) ||
//       (student.university || '').toLowerCase().includes(searchLower);

//     const internshipMatch = 
//       (student.internshipTitle || '').toLowerCase().includes(searchLower) ||
//       (student.companyName || '').toLowerCase().includes(searchLower) ||
//       (student.internshipDescription || '').toLowerCase().includes(searchLower);

//     const statusMatch = 
//       statusFilter === "All" || 
//       (student.internshipStatus?.toString().toLowerCase() === statusFilter.toLowerCase());

//     return (studentMatch || internshipMatch) && statusMatch;
//   });

//   // Export to Excel
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       filteredData.map((item) => ({
//         "Student Name": item.name,
//         "Email": item.email,
//         "University": item.university,
//         "Internship Title": item.internshipTitle,
//         "Company Name": item.companyName,
//         "Job Type": item.internshipType,
//         "Duration": item.internshipDuration,
//         "Status": item.internshipStatus
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Student Internships");
//     XLSX.writeFile(workbook, "Student_Internship_Report.xlsx");
//   };

//   // Export to PDF
//   const exportToPDF = () => {
//     const doc = new jsPDF();
    
//     doc.setFontSize(18);
//     doc.text("Student Internship Report", 14, 15);
    
//     doc.autoTable({
//       head: [
//         ["Student", "University", "Internship", "Company", "Type", "Duration", "Status"]
//       ],
//       body: filteredData.map((item) => [
//         item.name,
//         item.university,
//         item.internshipTitle,
//         item.companyName,
//         item.internshipType,
//         item.internshipDuration,
//         item.internshipStatus
//       ]),
//       startY: 25,
//       styles: { fontSize: 10, cellPadding: 2 },
//       headStyles: {
//         fillColor: [41, 128, 185],
//         textColor: 255,
//         fontStyle: "bold"
//       }
//     });
    
//     doc.save("Student_Internship_Report.pdf");
//   };

//   // View details handler
//   const handleViewDetails = (student) => {
//     setSelectedStudent(student);
//     setShowDetailsModal(true);
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center mt-5">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-danger mt-3" role="alert">
//         Error loading data: {error}
//       </div>
//     );
//   }

//   return (
//     <section className="p-4 bg-white rounded">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="text-lg font-bold">Student Internship Details</h2>
//         <div className="d-flex">
//           <Form.Control
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ width: "200px", marginRight: "10px" }}
//           />
//           <Dropdown>
//             <Dropdown.Toggle variant="success" id="dropdown-report">
//               Generate Report
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={exportToExcel}>Excel Report</Dropdown.Item>
//               <Dropdown.Item onClick={exportToPDF}>PDF Report</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Student</th>
//               <th>Internship</th>
//               <th>Company</th>
//               <th>Type</th>
//               <th>Duration</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
            
//             {filteredData.map((student, index) => (
//                     <tr key={`${student.id || 'no-id'}-${student.internshipId}-${index}`}>
//                     <td>{index + 1}</td>
//                     <td>
//                         <strong>{student.name}</strong>
//                         <p className="text-muted small mb-0">{student.email}</p>
//                     </td>
                     
//                 <td>
//                   <strong>{student.internshipTitle}</strong>
//                   <p className="text-muted small mb-0">{student.internshipDescription}</p>
//                 </td>
//                 <td>
//                   <div className="d-flex align-items-center">
//                     {student.companyLogo && (
//                       <img 
//                         src={student.companyLogo} 
//                         alt={student.companyName}
//                         width="30"
//                         height="30"
//                         className="rounded-circle me-2"
//                       />
//                     )}
//                     {student.companyName}
//                   </div>
//                 </td>
//                 <td>{student.internshipType}</td>
//                 <td>{student.internshipDuration}</td>
//                 <td>
//                   <Badge bg={statusVariant[student.internshipStatus] || 'secondary'}>
//                     {student.internshipStatus || 'Unknown'}
//                   </Badge>
//                 </td>
//                 <td>
//                   <Button 
//                     variant="info" 
//                     size="sm" 
//                     onClick={() => handleViewDetails(student)}
//                   >
//                     View
//                   </Button>
//                 </td>
//                     </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {/* Student Details Modal */}
//         <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
//         <Modal.Header closeButton className="border-bottom-0 pb-0">
//             <Modal.Title className="fw-bold">
//             <i className="bi bi-person-badge me-2"></i>
//             Student Internship Details
//             </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="pt-4">
//             {selectedStudent && (
//             <div className="container-fluid">
//                 {/* Student Information Section */}
//                 <div className="card mb-4 border-0 shadow-sm">
//                 <div className="card-header bg-light">
//                     <h5 className="mb-0 fw-semibold">
//                     <i className="bi bi-person-circle me-2"></i>
//                     Student Information
//                     </h5>
//                 </div>
//                 <div className="card-body">
//                     <div className="row">
//                     <div className="col-md-6 mb-3">
//                         <div className="d-flex align-items-center">
//                         <span className="badge bg-primary bg-opacity-10 text-primary me-2">
//                             <i className="bi bi-person"></i>
//                         </span>
//                         <div>
//                             <p className="mb-0 text-muted small">Full Name</p>
//                             <p className="mb-0 fw-semibold">{selectedStudent.name}</p>
//                         </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                         <div className="d-flex align-items-center">
//                         <span className="badge bg-primary bg-opacity-10 text-primary me-2">
//                             <i className="bi bi-envelope"></i>
//                         </span>
//                         <div>
//                             <p className="mb-0 text-muted small">Email</p>
//                             <p className="mb-0 fw-semibold">{selectedStudent.email}</p>
//                         </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                         <div className="d-flex align-items-center">
//                         <span className="badge bg-primary bg-opacity-10 text-primary me-2">
//                             <i className="bi bi-telephone"></i>
//                         </span>
            
//                         </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                         <div className="d-flex align-items-center">
//                         <span className="badge bg-primary bg-opacity-10 text-primary me-2">
//                             <i className="bi bi-building"></i>
//                         </span>
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//                 </div>

//                 {/* Internship Details Section */}
//                 <div className="card mb-4 border-0 shadow-sm">
//                 <div className="card-header bg-light">
//                     <h5 className="mb-0 fw-semibold">
//                     <i className="bi bi-briefcase me-2"></i>
//                     Internship Details
//                     </h5>
//                 </div>
//                 <div className="card-body">
//                     <div className="row">
//                     <div className="col-md-6 mb-3">
//                         <div className="d-flex align-items-center">
//                         <span className="badge bg-info bg-opacity-10 text-info me-2">
//                             <i className="bi bi-bookmark"></i>
//                         </span>
//                         <div>
//                             <p className="mb-0 text-muted small">Position</p>
//                             <p className="mb-0 fw-semibold">{selectedStudent.internshipTitle}</p>
//                         </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                         <div className="d-flex align-items-center">
//                         <span className="badge bg-info bg-opacity-10 text-info me-2">
//                             <i className="bi bi-building"></i>
//                         </span>
//                         <div>
//                             <p className="mb-0 text-muted small">Company</p>
//                             <p className="mb-0 fw-semibold">{selectedStudent.companyName}</p>
//                         </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                         <div className="d-flex align-items-center">
//                         <span className="badge bg-info bg-opacity-10 text-info me-2">
//                             <i className="bi bi-clock"></i>
//                         </span>
//                         <div>
//                             <p className="mb-0 text-muted small">Duration</p>
//                             <p className="mb-0 fw-semibold">{selectedStudent.internshipDuration}</p>
//                         </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                         <div className="d-flex align-items-center">
//                         <span className="badge bg-info bg-opacity-10 text-info me-2">
//                             <i className="bi bi-gear"></i>
//                         </span>
//                         <div>
//                             <p className="mb-0 text-muted small">Job Type</p>
//                             <p className="mb-0 fw-semibold">{selectedStudent.internshipType}</p>
//                         </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                         <div className="d-flex align-items-center">
//                         <span className="badge bg-info bg-opacity-10 text-info me-2">
//                             <i className="bi bi-list-check"></i>
//                         </span>
//                         <div>
//                             <p className="mb-0 text-muted small">Status</p>
//                             <Badge 
//                             bg={statusVariant[selectedStudent.internshipStatus]} 
//                             className="align-middle"
//                             >
//                             {selectedStudent.internshipStatus}
//                             </Badge>
//                         </div>
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//                 </div>

//                 {/* Description Section */}
//                 {selectedStudent.internshipDescription && (
//                 <div className="card border-0 shadow-sm">
//                     <div className="card-header bg-light">
//                     <h5 className="mb-0 fw-semibold">
//                         <i className="bi bi-card-text me-2"></i>
//                         Position Description
//                     </h5>
//                     </div>
//                     <div className="card-body">
//                     <div className="p-3 bg-light bg-opacity-10 rounded">
//                         <p className="mb-0">{selectedStudent.internshipDescription}</p>
//                     </div>
//                     </div>
//                 </div>
//                 )}
//             </div>
//             )}
//         </Modal.Body>
//         <Modal.Footer className="border-top-0">
//             <Button 
//             variant="outline-secondary" 
//             onClick={() => setShowDetailsModal(false)}
//             className="d-flex align-items-center"
//             >
//             <i className="bi bi-x-lg me-2"></i>
//             Close
//             </Button>
           
//         </Modal.Footer>
//         </Modal>
//     </section>
//   );
// };

// export default StudentInternshipDetails;


import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Dropdown, Spinner, Modal, Form } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";

const StudentInternshipDetails = () => {
  const [internshipData, setInternshipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Status badge colors
  const statusVariant = {
    Approved: "success",
    Pending: "warning",
    Rejected: "danger"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const internshipsResponse = await axios.get("http://localhost:5000/api/internships");
        const internships = internshipsResponse.data;
        
        const enrichedInternships = await Promise.all(
          internships.map(async (internship) => {
            try {
              const companyResponse = await axios.get(
                `http://localhost:5000/api/softwarehouses/${internship.companyId}`
              );
              const studentsResponse = await axios.get(
                `http://localhost:5000/api/internships/${internship._id}/students`
              );
              
              return {
                ...internship,
                companyName: companyResponse.data?.name || 'Unknown Company',
                companyLogo: companyResponse.data?.logo || '',
                students: studentsResponse.data?.map(student => ({
                  ...student,
                  internshipTitle: internship.title,
                  internshipDescription: internship.description,
                  internshipDuration: internship.duration,
                  internshipType: internship.type,
                  internshipStatus: internship.status
                })) || []
              };
            } catch (err) {
              console.error(`Error fetching details for internship ${internship._id}:`, err);
              return {
                ...internship,
                companyName: 'Unknown Company',
                companyLogo: '',
                students: []
              };
            }
          })
        );

        setInternshipData(enrichedInternships);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching internships:", err);
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Flatten the data to have one row per student
  const flattenedData = internshipData.flatMap(internship => 
    internship.students.map(student => ({
      ...student,
      internshipId: internship._id,
      companyName: internship.companyName,
      companyLogo: internship.companyLogo,
      internshipTitle: internship.title,
      internshipDescription: internship.description,
      internshipDuration: internship.duration,
      internshipType: internship.type,
      internshipStatus: internship.status
    }))
  );

  // Filter function for flattened data
  const filteredData = flattenedData.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    
    const studentMatch = 
      (student.name || '').toLowerCase().includes(searchLower) ||
      (student.email || '').toLowerCase().includes(searchLower) ||
      (student.university || '').toLowerCase().includes(searchLower);

    const internshipMatch = 
      (student.internshipTitle || '').toLowerCase().includes(searchLower) ||
      (student.companyName || '').toLowerCase().includes(searchLower) ||
      (student.internshipDescription || '').toLowerCase().includes(searchLower);

    const statusMatch = 
      statusFilter === "All" || 
      (student.internshipStatus?.toString().toLowerCase() === statusFilter.toLowerCase());

    return (studentMatch || internshipMatch) && statusMatch;
  });

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        "Student Name": item.name,
        "Email": item.email,
        "University": item.university,
        "Internship Title": item.internshipTitle,
        "Company Name": item.companyName,
        "Job Type": item.internshipType,
        "Duration": item.internshipDuration,
        "Status": item.internshipStatus
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Internships");
    XLSX.writeFile(workbook, "Student_Internship_Report.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Student Internship Report", 14, 15);
    doc.autoTable({
      head: [
        ["Student", "University", "Internship", "Company", "Type", "Duration", "Status"]
      ],
      body: filteredData.map((item) => [
        item.name,
        item.university,
        item.internshipTitle,
        item.companyName,
        item.internshipType,
        item.internshipDuration,
        item.internshipStatus
      ]),
      startY: 25,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold"
      }
    });
    doc.save("Student_Internship_Report.pdf");
  };

  // View details handler
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-3" role="alert">
        Error loading data: {error}
      </div>
    );
  }

  return (
    <section className="p-4 bg-white rounded">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <h2 className="text-lg font-bold mb-0">Student Internship Details</h2>
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center w-100 w-sm-auto gap-2">
          <Form.Control
            type="text"
            placeholder="Search..."
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
              <Dropdown.Item onClick={exportToExcel}>Excel Report</Dropdown.Item>
              <Dropdown.Item onClick={exportToPDF}>PDF Report</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Internship</th>
              <th>Company</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => (
              <tr key={`${student.id || 'no-id'}-${student.internshipId}-${index}`}>
                <td>{index + 1}</td>
                <td>
                  <strong>{student.name}</strong>
                  <p className="text-muted small mb-0">{student.email}</p>
                </td>
                <td>
                  <strong>{student.internshipTitle}</strong>
                  <p className="text-muted small mb-0">{student.internshipDescription}</p>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    {student.companyLogo && (
                      <img 
                        src={student.companyLogo} 
                        alt={student.companyName}
                        width="30"
                        height="30"
                        className="rounded-circle me-2"
                      />
                    )}
                    {student.companyName}
                  </div>
                </td>
                <td>{student.internshipType}</td>
                <td>{student.internshipDuration}</td>
                <td>
                  <Badge bg={statusVariant[student.internshipStatus] || 'secondary'}>
                    {student.internshipStatus || 'Unknown'}
                  </Badge>
                </td>
                <td>
                  <Button 
                    variant="info" 
                    size="sm" 
                    onClick={() => handleViewDetails(student)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Student Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-bottom-0 pb-0">
          <Modal.Title className="fw-bold">
            <i className="bi bi-person-badge me-2"></i>
            Student Internship Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-4">
          {selectedStudent && (
            <div className="container-fluid">
              {/* Student Information Section */}
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0 fw-semibold">
                    <i className="bi bi-person-circle me-2"></i>
                    Student Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-primary bg-opacity-10 text-primary me-2">
                          <i className="bi bi-person"></i>
                        </span>
                        <div>
                          <p className="mb-0 text-muted small">Full Name</p>
                          <p className="mb-0 fw-semibold">{selectedStudent.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-primary bg-opacity-10 text-primary me-2">
                          <i className="bi bi-envelope"></i>
                        </span>
                        <div>
                          <p className="mb-0 text-muted small">Email</p>
                          <p className="mb-0 fw-semibold">{selectedStudent.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-primary bg-opacity-10 text-primary me-2">
                          <i className="bi bi-building"></i>
                        </span>
                        <div>
                          <p className="mb-0 text-muted small">University</p>
                          <p className="mb-0 fw-semibold">{selectedStudent.university || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Internship Details Section */}
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0 fw-semibold">
                    <i className="bi bi-briefcase me-2"></i>
                    Internship Details
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-info bg-opacity-10 text-info me-2">
                          <i className="bi bi-bookmark"></i>
                        </span>
                        <div>
                          <p className="mb-0 text-muted small">Position</p>
                          <p className="mb-0 fw-semibold">{selectedStudent.internshipTitle}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-info bg-opacity-10 text-info me-2">
                          <i className="bi bi-building"></i>
                        </span>
                        <div>
                          <p className="mb-0 text-muted small">Company</p>
                          <p className="mb-0 fw-semibold">{selectedStudent.companyName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-info bg-opacity-10 text-info me-2">
                          <i className="bi bi-clock"></i>
                        </span>
                        <div>
                          <p className="mb-0 text-muted small">Duration</p>
                          <p className="mb-0 fw-semibold">{selectedStudent.internshipDuration}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-info bg-opacity-10 text-info me-2">
                          <i className="bi bi-gear"></i>
                        </span>
                        <div>
                          <p className="mb-0 text-muted small">Job Type</p>
                          <p className="mb-0 fw-semibold">{selectedStudent.internshipType}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-info bg-opacity-10 text-info me-2">
                          <i className="bi bi-list-check"></i>
                        </span>
                        <div>
                          <p className="mb-0 text-muted small">Status</p>
                          <Badge 
                            bg={statusVariant[selectedStudent.internshipStatus]} 
                            className="align-middle"
                          >
                            {selectedStudent.internshipStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              {selectedStudent.internshipDescription && (
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-light">
                    <h5 className="mb-0 fw-semibold">
                      <i className="bi bi-card-text me-2"></i>
                      Position Description
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="p-3 bg-light bg-opacity-10 rounded">
                      <p className="mb-0">{selectedStudent.internshipDescription}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowDetailsModal(false)}
            className="d-flex align-items-center"
          >
            <i className="bi bi-x-lg me-2"></i>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default StudentInternshipDetails;