// // import React, { useState, useEffect } from "react";
// // import { Table, Modal, Form, Button } from "react-bootstrap";
// // import SoftHouseProfile from "../softhouse/SoftHouseProfile.jsx";
// // import axios from "axios";

// // const SoftwareHouses = () => {
// //   const [data, setData] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");               // ← Search term state
// //   const [showModal, setShowModal] = useState(false);
// //   const [showViewModal, setShowViewModal] = useState(false);
// //   const [modalTitle, setModalTitle] = useState(null);
// //   const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "", status: 1 });
// //   const [editId, setEditId] = useState(null);
// //   const [softViewEmail, setSoftViewEmail] = useState(null);

// //   const statusFilter = 1;

// //   const fetchData = async () => {
// //     try {
// //       const response = await axios.get(
// //         `http://localhost:5000/api/softwarehouses/byid/${statusFilter}`
// //       );
// //       setData(response.data);
// //     } catch (error) {
// //       console.error("Error fetching data", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const handleOpenModal = () => {
// //     setFormData({ name: "", email: "", phone: "", location: "", status: 1 });
// //     setEditId(null);
// //     setModalTitle("Create Software House");
// //     setShowModal(true);
// //   };
// //   const handleCloseModal = () => setShowModal(false);
// //   const handleCloseViewModal = () => setShowViewModal(false);

// //   const handleSave = async () => {
// //     try {
// //       if (editId) {
// //         await axios.put(
// //           `http://localhost:5000/api/softwarehouses/${editId}`,
// //           formData
// //         );
// //         setData((prev) =>
// //           prev.map((item) =>
// //             item._id === editId ? { ...item, ...formData } : item
// //           )
// //         );
// //       } else {
// //         const resp = await axios.post(
// //           "http://localhost:5000/api/softwarehouses",
// //           formData
// //         );
// //         setData((prev) => [...prev, resp.data]);
// //       }
// //       setShowModal(false);
// //       setEditId(null);
// //     } catch (err) {
// //       console.error("Error saving record:", err);
// //       alert("Failed to save record. Please try again.");
// //     }
// //   };

// //   const handleEdit = (item) => {
// //     setFormData({
// //       name: item.name,
// //       email: item.email,
// //       phone: item.phone,
// //       location: item.location,
// //       status: item.status,
// //     });
// //     setEditId(item._id);
// //     setModalTitle("Edit Software House");
// //     setShowModal(true);
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/softwarehouses/${id}`);
// //       setData((prev) => prev.filter((item) => item._id !== id));
// //       alert("Software house deleted successfully");
// //     } catch (err) {
// //       console.error("Error deleting softwarehouse:", err);
// //       alert("Failed to delete softwarehouse. Please try again.");
// //     }
// //   };

// //   const toggleStatus = async (id, currentStatus) => {
// //     try {
// //       const newStatus = currentStatus === 1 ? 0 : 1;
// //       await axios.put(
// //         `http://localhost:5000/api/softwarehouses/status/${id}`,
// //         { status: newStatus }
// //       );
// //       setData((prev) =>
// //         prev.map((item) =>
// //           item._id === id ? { ...item, status: newStatus } : item
// //         )
// //       );
// //     } catch (err) {
// //       console.error("Error updating status:", err);
// //     }
// //   };

// //   const handleView = (item) => {
// //     setSoftViewEmail(item._id);
// //     setShowViewModal(true);
// //   };

// //   // Filter data by search term
// //   const filteredData = data.filter((item) =>
// //     [item.name, item.email, item.phone, item.location]
// //       .some((field) =>
// //         field.toLowerCase().includes(searchTerm.toLowerCase())
// //       )
// //   );

// //   return (
// //     <section className="bg-white p-4 rounded">
// //       <div className="d-flex justify-content-between align-items-center mb-3">
// //         <h2 className="text-lg font-bold">Registered Software Houses</h2>
// //         <Form.Control
// //           type="text"
// //           placeholder="Search by name, email, phone or location"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           style={{ width: "300px" }}
// //         />
// //       </div>

// //       <Button
// //         variant="primary"
// //         onClick={handleOpenModal}
// //         style={{ marginBottom: "10px", float: "right" }}
// //       >
// //         + Add Software House
// //       </Button>

// //       <div className="overflow-x-auto">
// //         <Table striped bordered hover responsive>
// //           <thead>
// //             <tr>
// //               <th>#</th>
// //               <th>Name</th>
// //               <th>Email</th>
// //               <th>Phone</th>
// //               <th>Location</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredData.map((item, idx) => (
// //               <tr key={item._id}>
// //                 <td>{idx + 1}</td>
// //                 <td>{item.name}</td>
// //                 <td>{item.email}</td>
// //                 <td>{item.phone}</td>
// //                 <td>{item.location}</td>
// //                 <td>
// //                   <span
// //                     style={{
// //                       color: item.status === 1 ? "green" : "#dc3545",
// //                       fontWeight: "bold",
// //                     }}
// //                   >
// //                     {item.status === 1 ? "Registered" : "Inactive"}
// //                   </span>
// //                 </td>
// //                 <td>
// //                   <Button
// //                     size="sm"
// //                     onClick={() => toggleStatus(item._id, item.status)}
// //                     style={{
// //                       backgroundColor:
// //                         item.status === 1 ? "#dc3545" : "green",
// //                       color: "white",
// //                       border: "none",
// //                       padding: "5px 10px",
// //                     }}
// //                   >
// //                     {item.status === 1 ? "Deactivate" : "Activate"}
// //                   </Button>{" "}
// //                   <Button
// //                     variant="warning"
// //                     size="sm"
// //                     onClick={() => handleEdit(item)}
// //                   >
// //                     Edit
// //                   </Button>{" "}
// //                   <Button
// //                     variant="danger"
// //                     size="sm"
// //                     onClick={() => handleDelete(item._id)}
// //                   >
// //                     Delete
// //                   </Button>{" "}
// //                   <Button
// //                     variant="info"
// //                     size="sm"
// //                     onClick={() => handleView(item)}
// //                   >
// //                     View
// //                   </Button>
// //                 </td>
// //               </tr>
// //             ))}
// //             {filteredData.length === 0 && (
// //               <tr>
// //                 <td colSpan="7" className="text-center">
// //                   No matches found.
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </Table>
// //       </div>

// //       {/* Create/Edit Modal */}
// //       <Modal show={showModal} onHide={handleCloseModal}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>{modalTitle}</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form>
// //             {["name", "email", "phone", "location"].map((field) => (
// //               <Form.Group className="mb-2" key={field}>
// //                 <Form.Label>
// //                   {field.charAt(0).toUpperCase() + field.slice(1)}
// //                 </Form.Label>
// //                 <Form.Control
// //                   type={field === "email" ? "email" : "text"}
// //                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
// //                   value={formData[field]}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, [field]: e.target.value })
// //                   }
// //                 />
// //               </Form.Group>
// //             ))}
// //             <Form.Group>
// //               <Form.Label>Status</Form.Label>
// //               <div>
// //                 <Form.Check
// //                   inline
// //                   type="radio"
// //                   label="Registered"
// //                   name="status"
// //                   value={1}
// //                   checked={formData.status === 1}
// //                   onChange={() =>
// //                     setFormData((f) => ({ ...f, status: 1 }))
// //                   }
// //                 />
// //                 <Form.Check
// //                   inline
// //                   type="radio"
// //                   label="Inactive"
// //                   name="status"
// //                   value={0}
// //                   checked={formData.status === 0}
// //                   onChange={() =>
// //                     setFormData((f) => ({ ...f, status: 0 }))
// //                   }
// //                 />
// //               </div>
// //             </Form.Group>
// //           </Form>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleCloseModal}>
// //             Close
// //           </Button>
// //           <Button variant="primary" onClick={handleSave}>
// //             Save
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>

// //       {/* View Modal */}
// //       <Modal size="xl" show={showViewModal} onHide={handleCloseViewModal}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Software House Details</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <SoftHouseProfile email={softViewEmail} />
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleCloseViewModal}>
// //             Close
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </section>
// //   );
// // };

// // export default SoftwareHouses;


// import React, { useState, useEffect } from "react";
// import { Table, Modal, Form, Button, Dropdown } from "react-bootstrap";
// import SoftHouseProfile from "../softhouse/SoftHouseProfile.jsx";
// import axios from "axios";
// import * as XLSX from 'xlsx'; // For Excel export
// import { jsPDF } from 'jspdf'; // For PDF export
// import 'jspdf-autotable'; // For PDF table generation

// const SoftwareHouses = () => {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");               
//   const [showModal, setShowModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [modalTitle, setModalTitle] = useState(null);
//   const [formData, setFormData] = useState({
//   name: "",
//   email: "",
//   phone: "",
//   location: "",
//   description: "",
//   about: "",
//   status: 1,
//   profileImage: ""
// });
//   const [editId, setEditId] = useState(null);
//   const [softViewEmail, setSoftViewEmail] = useState(null);
//   const statusFilter = 1;

//   // Add this function for Excel export
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredData.map(item => ({
//       Name: item.name,
//       Email: item.email,
//       Phone: item.phone,
//       Location: item.location,
//       Status: item.status === 1 ? "Registered" : "Inactive"
//     })));
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "SoftwareHouses");
//     XLSX.writeFile(workbook, "SoftwareHouses_Report.xlsx");
//   };

//   // Add this function for PDF export
//   const exportToPDF = () => {
//     const doc = new jsPDF();
    
//     // Title
//     doc.setFontSize(18);
//     doc.text("Software Houses Report", 14, 15);
    
//     // Table
//     doc.autoTable({
//       head: [['Name', 'Email', 'Phone', 'Location', 'Status']],
//       body: filteredData.map(item => [
//         item.name,
//         item.email,
//         item.phone,
//         item.location,
//         item.status === 1 ? "Registered" : "Inactive"
//       ]),
//       startY: 25,
//       styles: {
//         fontSize: 10,
//         cellPadding: 2,
//       },
//       headStyles: {
//         fillColor: [41, 128, 185],
//         textColor: 255,
//         fontStyle: 'bold'
//       }
//     });
    
//     doc.save('SoftwareHouses_Report.pdf');
//   };


  
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/softwarehouses/byid/${statusFilter}`
//       );
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleOpenModal = () => {
//     setFormData({ name: "", email: "", phone: "", location: "", status: 1 });
//     setEditId(null);
//     setModalTitle("Create Software House");
//     setShowModal(true);
//   };
//   const handleCloseModal = () => setShowModal(false);
//   const handleCloseViewModal = () => setShowViewModal(false);

//   const handleSave = async () => {
//     try {
//       if (editId) {
//         await axios.put(
//           `http://localhost:5000/api/softwarehouses/${editId}`,
//           formData
//         );
//         setData((prev) =>
//           prev.map((item) =>
//             item._id === editId ? { ...item, ...formData } : item
//           )
//         );
//       } else {
//         const resp = await axios.post(
//           "http://localhost:5000/api/softwarehouses",
//           formData
//         );
//         setData((prev) => [...prev, resp.data]);
//       }
//       setShowModal(false);
//       setEditId(null);
//     } catch (err) {
//       console.error("Error saving record:", err);
//       alert("Failed to save record. Please try again.");
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       name: item.name,
//       email: item.email,
//       phone: item.phone,
//       location: item.location,
//       status: item.status,
//     });
//     setEditId(item._id);
//     setModalTitle("Edit Software House");
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/softwarehouses/${id}`);
//       setData((prev) => prev.filter((item) => item._id !== id));
//       alert("Software house deleted successfully");
//     } catch (err) {
//       console.error("Error deleting softwarehouse:", err);
//       alert("Failed to delete softwarehouse. Please try again.");
//     }
//   };

//   const toggleStatus = async (id, currentStatus) => {
//     try {
//       const newStatus = currentStatus === 1 ? 0 : 1;
//       await axios.put(
//         `http://localhost:5000/api/softwarehouses/status/${id}`,
//         { status: newStatus }
//       );
//       setData((prev) =>
//         prev.map((item) =>
//           item._id === id ? { ...item, status: newStatus } : item
//         )
//       );
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   const handleView = async (item) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/api/softwarehouses/${item._id}`);
//     setSoftViewEmail(response.data); // or better: 
//     // setSoftViewData(response.data)
//     console.log(response.data);

//     setShowViewModal(true);
//   } catch (error) {
//     console.error("Error fetching software house profile:", error);
//     alert("Failed to load software house profile.");
//   }
// };

//   // Filter data by search term
//   const filteredData = data.filter((item) =>
//     [item.name, item.email, item.phone, item.location]
//       .some((field) =>
//         field.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//   );

//   return (
//     <section className="bg-white p-4 rounded">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="text-lg font-bold">Registered Software Houses</h2>
//         <div className="d-flex">
//           <Form.Control
//             type="text"
//             placeholder="Search by name, email, phone or location"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ width: "300px", marginRight: "10px" }}
//           />
//            {/* <Button
//         variant="primary"
//         onClick={handleOpenModal}
//         style={{ marginBottom: "10px", float: "right" }}
//       >
//         + Add Software House
//       </Button> */}
//           {/* Add this dropdown for report generation */}
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

//       <div className="overflow-x-auto">
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Location</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, idx) => (
//               <tr key={item._id}>
//                 <td>{idx + 1}</td>
//                 <td>{item.name}</td>
//                 <td>{item.email}</td>
//                 <td>{item.phone}</td>
//                 <td>{item.location}</td>
//                 <td>
//                   <span
//                     style={{
//                       color: item.status === 1 ? "green" : "#dc3545",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {item.status === 1 ? "Registered" : "Inactive"}
//                   </span>
//                 </td>
//                 <td>
//                   <Button
//                     size="sm"
//                     onClick={() => toggleStatus(item._id, item.status)}
//                     style={{
//                       backgroundColor:
//                         item.status === 1 ? "#dc3545" : "green",
//                       color: "white",
//                       border: "none",
//                       padding: "5px 10px",
//                     }}
//                   >
//                     {item.status === 1 ? "Deactivate" : "Activate"}
//                   </Button>{" "}
//                   <Button
//                     variant="warning"
//                     size="sm"
//                     onClick={() => handleEdit(item)}
//                   >
//                     Edit
//                   </Button>{" "}
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
//                     onClick={() => handleView(item)}
//                   >
//                     View
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//             {filteredData.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="text-center">
//                   No matches found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>

//             {/* Create/Edit Modal */}
//       <Modal show={showModal} onHide={handleCloseModal} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{modalTitle}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <div className="flex flex-col md:flex-row gap-4 mb-4">
//               <div className="flex-1">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Company Logo</Form.Label>
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={formData.profileImage ? 
//                         `http://localhost:5000/${formData.profileImage}` : 
//                         'https://placehold.co/150x150'}
//                       alt="Company Logo"
//                       className="w-16 h-16 rounded-full object-cover border"
//                     />
//                     <Form.Control
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => 
//                         setFormData({ ...formData, profileImage: e.target.files[0] })
//                       }
//                     />
//                   </div>
//                 </Form.Group>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {["name", "email", "phone", "location"].map((field) => (
//                 <Form.Group className="mb-3" key={field}>
//                   <Form.Label>
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </Form.Label>
//                   <Form.Control
//                     type={field === "email" ? "email" : "text"}
//                     placeholder={`Enter ${field}`}
//                     value={formData[field]}
//                     onChange={(e) =>
//                       setFormData({ ...formData, [field]: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               ))}
//             </div>

//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter company description"
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Status</Form.Label>
//               <div className="d-flex gap-3">
//                 <Form.Check
//                   inline
//                   type="radio"
//                   label="Registered"
//                   name="status"
//                   value={1}
//                   checked={formData.status === 1}
//                   onChange={() =>
//                     setFormData((f) => ({ ...f, status: 1 }))
//                   }
//                 />
//                 <Form.Check
//                   inline
//                   type="radio"
//                   label="Inactive"
//                   name="status"
//                   value={0}
//                   checked={formData.status === 0}
//                   onChange={() =>
//                     setFormData((f) => ({ ...f, status: 0 }))
//                   }
//                 />
//               </div>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* View Modal */}
//       <Modal size="xl" show={showViewModal} onHide={handleCloseViewModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Software House Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <SoftHouseProfile email={softViewEmail} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseViewModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </section>
//   );
// };

// export default SoftwareHouses;

import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Button, Dropdown, Spinner } from "react-bootstrap";
import SoftHouseProfile from "../softhouse/SoftHouseProfile.jsx";
import axios from "axios";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const SoftwareHouses = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");               
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    status: 1,
    profileImage: null,
    profileImagePreview: ""
  });
  const [editId, setEditId] = useState(null);
  const [softViewData, setSoftViewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const statusFilter = 1;

  // Export functions
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData.map(item => ({
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
      Location: item.location,
      Status: item.status === 1 ? "Registered" : "Inactive"
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SoftwareHouses");
    XLSX.writeFile(workbook, "SoftwareHouses_Report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Software Houses Report", 14, 15);
    doc.autoTable({
      head: [['Name', 'Email', 'Phone', 'Location', 'Status']],
      body: filteredData.map(item => [
        item.name,
        item.email,
        item.phone,
        item.location,
        item.status === 1 ? "Registered" : "Inactive"
      ]),
      startY: 25,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      }
    });
    doc.save('SoftwareHouses_Report.pdf');
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/softwarehouses/byid/${statusFilter}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      description: "",
      status: 1,
      profileImage: null,
      profileImagePreview: ""
    });
    setEditId(null);
    setModalTitle("Create Software House");
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseViewModal = () => setShowViewModal(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      
      // Append all fields to formData
      Object.keys(formData).forEach(key => {
        if (key !== 'profileImagePreview' && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/softwarehouses/${editId}`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        fetchData(); // Refresh data after update
      } else {
        await axios.post(
          "http://localhost:5000/api/softwarehouses",
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        fetchData(); // Refresh data after create
      }
      setShowModal(false);
    } catch (err) {
      console.error("Error saving record:", err);
      alert("Failed to save record. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleEdit = (item) => {
  //   setFormData({
  //     name: item.name,
  //     email: item.email,
  //     phone: item.phone,
  //     location: item.location,
  //     description: item.description || "",
  //     status: item.status,
  //     profileImage: null,
  //     profileImagePreview: item.profileImage ? 
  //       `http://localhost:5000/${item.profileImage}` : ""
  //   });
  //   setEditId(item._id);
  //   setModalTitle("Edit Software House");
  //   setShowModal(true);
  // };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this software house?")) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:5000/api/softwarehouses/${id}`);
        fetchData(); // Refresh data after delete
      } catch (err) {
        console.error("Error deleting softwarehouse:", err);
        alert("Failed to delete softwarehouse. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      setLoading(true);
      const newStatus = currentStatus === 1 ? 0 : 1;
      await axios.put(
        `http://localhost:5000/api/softwarehouses/status/${id}`,
        { status: newStatus }
      );
      fetchData(); // Refresh data after status change
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (item) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/softwarehouses/${item._id}`
      );
      setSoftViewData(response.data);
      setShowViewModal(true);
    } catch (error) {
      console.error("Error fetching software house profile:", error);
      alert("Failed to load software house profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: file,
          profileImagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredData = data.filter((item) =>
    [item.name, item.email, item.phone, item.location]
      .some((field) =>
        field && field.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <section className="bg-white p-4 rounded">
      {loading && (
        <div className="overlay">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-lg font-bold">Registered Software Houses</h2>
        <div className="d-flex">
          <Form.Control
            type="text"
            placeholder="Search by name, email, phone or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "300px", marginRight: "10px" }}
          />
          <Dropdown className="mr-2">
            <Dropdown.Toggle variant="success" id="dropdown-report">
              Generate Report
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={exportToPDF}>PDF Report</Dropdown.Item>
              <Dropdown.Item onClick={exportToExcel}>Excel Report</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Button variant="primary" onClick={handleOpenModal}>
            + Add Software House
          </Button> */}
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.location}</td>
                <td>
                  <span
                    style={{
                      color: item.status === 1 ? "green" : "#dc3545",
                      fontWeight: "bold",
                    }}
                  >
                    {item.status === 1 ? "Registered" : "Inactive"}
                  </span>
                </td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => toggleStatus(item._id, item.status)}
                    style={{
                      backgroundColor: item.status === 1 ? "#dc3545" : "green",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                    }}
                    disabled={loading}
                  >
                    {item.status === 1 ? "Deactivate" : "Activate"}
                  </Button>{' '}
                  {/* <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    disabled={loading}
                  >
                    Edit
                  </Button>{' '} */}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                    disabled={loading}
                  >
                    Delete
                  </Button>{' '}
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleView(item)}
                    disabled={loading}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  {data.length === 0 ? "No software houses found" : "No matches found"}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Create/Edit Modal
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company Logo</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <img
                  src={formData.profileImagePreview || 
                    (formData.profileImage ? 
                      `http://localhost:5000/${formData.profileImage}` : 
                      'https://placehold.co/150x150')}
                  alt="Company Logo"
                  className="rounded-circle"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </Form.Group>

            <div className="row">
              {["name", "email", "phone", "location"].map((field) => (
                <div className="col-md-6" key={field}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Form.Label>
                    <Form.Control
                      type={field === "email" ? "email" : "text"}
                      placeholder={`Enter ${field}`}
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                </div>
              ))}
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter company description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <div className="d-flex gap-3">
                <Form.Check
                  inline
                  type="radio"
                  label="Registered"
                  name="status"
                  value={1}
                  checked={formData.status === 1}
                  onChange={() => setFormData({ ...formData, status: 1 })}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Inactive"
                  name="status"
                  value={0}
                  checked={formData.status === 0}
                  onChange={() => setFormData({ ...formData, status: 0 })}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* View Modal */}
      <Modal size="xl" show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Software House Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {softViewData ? (
            <SoftHouseProfile email={softViewData.email} />
          ) : (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default SoftwareHouses;