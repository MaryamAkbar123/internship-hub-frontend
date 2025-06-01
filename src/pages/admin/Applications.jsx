

// import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Dropdown, Form, Spinner } from "react-bootstrap";
// import axios from "axios";
// import SoftHouseProfile from '../softhouse/SoftHouseProfile.jsx';
// import * as XLSX from 'xlsx'; // For Excel export
// import { jsPDF } from 'jspdf'; // For PDF export
// import 'jspdf-autotable'; // For PDF table generation

// const Applications = () => {
//     const [data, setData] = useState([]);
//     const [showViewModal, setShowViewModal] = useState(false);
//     const [softViewData, setSoftViewData] = useState(null); // Add state for view data
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loading, setLoading] = useState(false); // Add loading state
//     const status = 0;

//     // Add this function for Excel export
//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(filteredData.map(item => ({
//             Name: item.name,
//             Email: item.email,
//             Phone: item.phone,
//             Location: item.location,
//             Status: item.status === 1 ? 'Registered' : 'Inactive'
//         })));
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
//         XLSX.writeFile(workbook, "SoftwareHouse_Applications.xlsx");
//     };

//     // Add this function for PDF export
//     const exportToPDF = () => {
//         const doc = new jsPDF();
        
//         // Title
//         doc.setFontSize(18);
//         doc.text("Software House Applications Report", 14, 15);
        
//         // Table
//         doc.autoTable({
//             head: [['Name', 'Email', 'Phone', 'Location', 'Status']],
//             body: filteredData.map(item => [
//                 item.name,
//                 item.email,
//                 item.phone,
//                 item.location,
//                 item.status === 1 ? 'Registered' : 'Inactive'
//             ]),
//             startY: 25,
//             styles: {
//                 fontSize: 10,
//                 cellPadding: 2,
//             },
//             headStyles: {
//                 fillColor: [41, 128, 185],
//                 textColor: 255,
//                 fontStyle: 'bold'
//             }
//         });
        
//         doc.save('SoftwareHouse_Applications.pdf');
//     };

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`http://localhost:5000/api/softwarehouses/byid/${status}`);
//             setData(response.data);
//         } catch (error) {
//             console.error('Error fetching data', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleStatus = async (id, currentStatus) => {
//         try {
//             setLoading(true);
//             const newStatus = currentStatus === 1 ? 0 : 1;
//             await axios.put(`http://localhost:5000/api/softwarehouses/status/${id}`, { status: newStatus });
//             setData((prevData) =>
//                 prevData.map((item) =>
//                     item._id === id ? { ...item, status: newStatus } : item
//                 )
//             );
//         } catch (error) {
//             console.error('Error updating status:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             setLoading(true);
//             await axios.delete(`http://localhost:5000/api/softwarehouses/${id}`);
//             setData((prevData) => prevData.filter((item) => item._id !== id));
//             alert('Software house rejected and deleted successfully');
//         } catch (error) {
//             console.error('Error deleting softwarehouse:', error);
//             alert('Failed to delete softwarehouse. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleView = async (item) => {
//         try {
//             setLoading(true);
//             const response = await axios.get(
//                 `http://localhost:5000/api/softwarehouses/${item._id}`
//             );
//             setSoftViewData(response.data);
//             setShowViewModal(true);
//         } catch (error) {
//             console.error("Error fetching software house profile:", error);
//             alert("Failed to load software house profile.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCloseViewModal = () => {
//         setShowViewModal(false);
//         setSoftViewData(null); // Reset view data on close
//     };

//     // Filter data based on search term
//     const filteredData = data.filter((item) =>
//         [item.name, item.email, item.phone, item.location]
//             .some((field) =>
//                 field.toLowerCase().includes(searchTerm.toLowerCase())
//             )
//     );

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <section className="bg-white p-4 rounded">
//             {loading && (
//                 <div className="overlay">
//                     <Spinner animation="border" variant="primary" />
//                 </div>
//             )}

//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h2 className="text-lg font-bold">Software House Applications</h2>
//                 <div className="d-flex">
//                     <Form.Control
//                         type="text"
//                         placeholder="Search applications..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         style={{ width: "300px", marginRight: "10px" }}
//                     />
                    
//                     <Dropdown>
//                         <Dropdown.Toggle variant="success" id="dropdown-report">
//                             Generate Report
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                             <Dropdown.Item onClick={exportToPDF}>PDF Report</Dropdown.Item>
//                             <Dropdown.Item onClick={exportToExcel}>Excel Report</Dropdown.Item>
//                         </Dropdown.Menu>
//                     </Dropdown>
//                 </div>
//             </div>

//             <div className="overflow-x-auto">
//                 <Table striped bordered hover responsive>
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Location</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredData.length > 0 ? (
//                             filteredData.map((item, index) => (
//                                 <tr key={item._id}>
//                                     <td>{index + 1}</td>
//                                     <td>{item.name}</td>
//                                     <td>{item.email}</td>
//                                     <td>{item.phone}</td>
//                                     <td>{item.location}</td>
//                                     <td>
//                                         <span
//                                             style={{
//                                                 color: item.status === 1 ? 'green' : '#dc3545',
//                                                 fontWeight: 'bold',
//                                             }}
//                                         >
//                                             {item.status === 1 ? 'Register' : 'Inactive'}
//                                         </span>
//                                     </td>
//                                     <td>
//                                         <Button
//                                             onClick={() => toggleStatus(item._id, item.status)}
//                                             style={{
//                                                 backgroundColor: item.status === 1 ? '#dc3545' : 'green',
//                                                 color: 'white',
//                                                 border: 'none',
//                                                 padding: '5px 10px',
//                                                 cursor: 'pointer',
//                                             }}
//                                             disabled={loading}
//                                         >
//                                             {item.status === 1 ? 'Reject' : 'Accept'}
//                                         </Button>{' '}
//                                         <Button
//                                             variant="danger"
//                                             size="sm"
//                                             onClick={() => handleDelete(item._id)}
//                                             disabled={loading}
//                                         >
//                                             Reject
//                                         </Button>{' '}
//                                         <Button
//                                             variant="info"
//                                             size="sm"
//                                             onClick={() => handleView(item)}
//                                             disabled={loading}
//                                         >
//                                             View
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="7" className="text-center">
//                                     {data.length === 0 ? 'No applications found' : 'No matches found'}
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </Table>
//             </div>

//             {/* View Software House Modal */}
//             <Modal size="xl" show={showViewModal} onHide={handleCloseViewModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Software House Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {softViewData ? (
//                         <SoftHouseProfile email={softViewData.email} />
//                     ) : (
//                         <div className="text-center py-4">
//                             <Spinner animation="border" variant="primary" />
//                         </div>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseViewModal}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </section>
//     );
// };

// export default Applications;



import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Dropdown, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import SoftHouseProfile from '../softhouse/SoftHouseProfile.jsx';
import * as XLSX from 'xlsx'; // For Excel export
import { jsPDF } from 'jspdf'; // For PDF export
import 'jspdf-autotable'; // For PDF table generation

const Applications = () => {
    const [data, setData] = useState([]);
    const [showViewModal, setShowViewModal] = useState(false);
    const [softViewData, setSoftViewData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const status = 0;

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData.map(item => ({
            Name: item.name,
            Email: item.email,
            Phone: item.phone,
            Location: item.location,
            Status: item.status === 1 ? 'Registered' : 'Inactive'
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
        XLSX.writeFile(workbook, "SoftwareHouse_Applications.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Software House Applications Report", 14, 15);
        doc.autoTable({
            head: [['Name', 'Email', 'Phone', 'Location', 'Status']],
            body: filteredData.map(item => [
                item.name,
                item.email,
                item.phone,
                item.location,
                item.status === 1 ? 'Registered' : 'Inactive'
            ]),
            startY: 25,
            styles: {
                fontSize: 10,
                cellPadding: 2,
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold'
            }
        });
        doc.save('SoftwareHouse_Applications.pdf');
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/softwarehouses/byid/${status}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            setLoading(true);
            const newStatus = currentStatus === 1 ? 0 : 1;
            await axios.put(`http://localhost:5000/api/softwarehouses/status/${id}`, { status: newStatus });
            setData((prevData) =>
                prevData.map((item) =>
                    item._id === id ? { ...item, status: newStatus } : item
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:5000/api/softwarehouses/${id}`);
            setData((prevData) => prevData.filter((item) => item._id !== id));
            alert('Software house rejected and deleted successfully');
        } catch (error) {
            console.error('Error deleting softwarehouse:', error);
            alert('Failed to delete softwarehouse. Please try again.');
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

    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setSoftViewData(null);
    };

    const filteredData = data.filter((item) =>
        [item.name, item.email, item.phone, item.location]
            .some((field) =>
                field && field.toLowerCase().includes(searchTerm.toLowerCase())
            )
    );

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="bg-white p-4 rounded">
            {loading && (
                <div className="overlay">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
                <h2 className="text-lg font-bold mb-0">Software House Applications</h2>
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center w-100 w-sm-auto gap-2">
                    <Form.Control
                        type="text"
                        placeholder="Search applications..."
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
                            <Dropdown.Item onClick={exportToPDF}>PDF Report</Dropdown.Item>
                            <Dropdown.Item onClick={exportToExcel}>Excel Report</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.location}</td>
                                    <td>
                                        <span
                                            style={{
                                                color: item.status === 1 ? 'green' : '#dc3545',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {item.status === 1 ? 'Register' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => toggleStatus(item._id, item.status)}
                                            style={{
                                                backgroundColor: item.status === 1 ? '#dc3545' : 'green',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px 10px',
                                                cursor: 'pointer',
                                            }}
                                            disabled={loading}
                                        >
                                            {item.status === 1 ? 'Reject' : 'Accept'}
                                        </Button>{' '}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(item._id)}
                                            disabled={loading}
                                        >
                                            Reject
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    {data.length === 0 ? 'No applications found' : 'No matches found'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* View Software House Modal */}
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

export default Applications;