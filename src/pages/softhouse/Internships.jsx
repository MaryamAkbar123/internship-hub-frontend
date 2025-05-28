
// // import React, { useEffect, useState } from 'react';
// // import { Table, Modal, Button, Form } from 'react-bootstrap';
// // import axios from 'axios';

// // const Internships = () => {
// //     const [internships, setInternships] = useState([]);
// //     const [companies, setCompanies] = useState([]);
// //     const [showModal, setShowModal] = useState(false);
// //     const [modalTitle, setModalTitle] = useState(null);
// //     const [imagePreview, setImagePreview] = useState(null);

// //     const handleImageChange = (e) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             setFormData({ ...formData, image: file });
// //             setImagePreview(URL.createObjectURL(file));
// //         }
// //     };

// //     const loginID = localStorage.getItem('id');
// //     const companyId = localStorage.getItem('companyId');

// //     const [formData, setFormData] = useState({
// //         title: '', companyId: companyId,
// //         description: '', duration: '',
// //         type: 'Full-Time', deadline: '',
// //         status: 1, postedBy: loginID,
// //         image: null,
// //     });
// //     const [editId, setEditId] = useState(null);

// //     const handleOpenModal = () => {
// //         setFormData({
// //             title: '', companyId: companyId,
// //             description: '', duration: '',
// //             type: 'Full-Time', deadline: '',
// //             status: 1, postedBy: loginID
// //         });
// //         setEditId(null);
// //         setModalTitle('Create New Internship');
// //         setShowModal(true);
// //         setImagePreview('');
// //     };

// //     const handleCloseModal = () => setShowModal(false);

// //     useEffect(() => {
// //         fetchCompanies();
// //         fetchInternships();
// //     }, []);

// //     const fetchCompanies = async () => {
// //         try {
// //             const response = await axios.get('http://localhost:5000/api/softwarehouses/');
// //             setCompanies(response.data);
// //         } catch (error) {
// //             console.error('Failed to fetch companies:', error);
// //         }
// //     };

// //     const fetchInternships = async () => {
// //         try {
// //             const response = await axios.get(`http://localhost:5000/api/internships/${companyId}`);
// //             setInternships(response.data);
// //         } catch (error) {
// //             console.error('Failed to fetch internships:', error);
// //         }
// //     };

// //     const handleSave = async () => {
// //         try {
// //             const formDataToSend = new FormData();
// //             formDataToSend.append('title', formData.title);
// //             formDataToSend.append('companyId', formData.companyId);
// //             formDataToSend.append('description', formData.description);
// //             formDataToSend.append('duration', formData.duration);
// //             formDataToSend.append('type', formData.type);
// //             formDataToSend.append('deadline', formData.deadline);
// //             formDataToSend.append('status', formData.status);
// //             formDataToSend.append('postedBy', formData.postedBy);

// //             if (formData.image) {
// //                 formDataToSend.append('image', formData.image); // Append image file
// //             }

// //             if (editId) {
// //                 await axios.put(`http://localhost:5000/api/internships/${editId}`, formDataToSend, {
// //                     headers: { 'Content-Type': 'multipart/form-data' },
// //                 });
// //                 setInternships((prevData) =>
// //                     prevData.map((item) => (item._id === editId ? { ...item, ...formData } : item))
// //                 );
// //             } else {
// //                 const response = await axios.post('http://localhost:5000/api/internships', formDataToSend, {
// //                     headers: { 'Content-Type': 'multipart/form-data' },
// //                 });
// //                 setInternships((prevData) => [...prevData, response.data]);
// //             }

// //             setShowModal(false);
// //             setFormData({
// //                 title: '',
// //                 companyId: companyId,
// //                 description: '',
// //                 duration: '',
// //                 type: 'Full-Time',
// //                 deadline: '',
// //                 status: 1,
// //                 postedBy: loginID,
// //                 image: null, // Reset image
// //             });
// //             setImagePreview(null); // Clear preview
// //             setEditId(null);
// //         } catch (error) {
// //             console.error('Error saving record:', error);
// //             alert('Failed to save record. Please try again.');
// //         }
// //     };

// //     const handleEdit = (item) => {
// //         setFormData({
// //             title: item?.title,
// //             companyId: item?.companyId,
// //             description: item?.description, duration: item?.duration, type: item.type,
// //             deadline: item?.deadline, location: item?.location,
// //             status: item?.status, postedBy: item?.postedBy,
// //             image: item.image,
// //         });
// //         setImagePreview(`/src/assets/images/${item.image}`);
// //         setEditId(item._id);
// //         setModalTitle('Edit Internship');
// //         setShowModal(true);
// //     };

// //     const handleDelete = async (id) => {
// //         try {
// //             await axios.delete(`http://localhost:5000/api/internships/${id}`);
// //             setInternships((prevData) => prevData.filter((item) => item._id !== id));
// //             alert('Internship deleted successfully');
// //         } catch (error) {
// //             console.error('Error deleting internship:', error);
// //             alert('Failed to delete internship. Please try again.');
// //         }
// //     };

// //     return (
// //         <section className="bg-white p-4 rounded">
// //             <h2 className="text-lg font-bold">Internships</h2>
// //             <Button variant="primary" onClick={handleOpenModal} style={{ marginBottom: '10px', float: 'right' }}>+ Add Internship</Button>
// //             <div className="table-responsive">
// //                 <Table striped bordered hover>
// //                     <thead>
// //                         <tr>
// //                             <th>Company</th>
// //                             <th>Title</th>
// //                             <th>Duration</th>
// //                             <th>Type</th>
// //                             <th>Deadline</th>
// //                             <th>Action</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {internships.map((item) => (
// //                             <tr key={item?._id}>
// //                                 <td>{item?.companyDetails?.name}</td>
// //                                 <td>{item?.title}</td>
// //                                 <td>{item?.duration}</td>
// //                                 <td>{item?.type}</td>
// //                                 <td>{new Date(item.deadline).toLocaleString()}</td>
// //                                 <td>
// //                                     <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>Edit</Button>{' '}
// //                                     <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>Delete</Button>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </Table>
// //             </div>
// //             <Modal show={showModal} onHide={handleCloseModal} size='lg'>
// //                 <Modal.Header closeButton>
// //                     <Modal.Title>{modalTitle}</Modal.Title>
// //                 </Modal.Header>
// //                 <Modal.Body>
// //                     <Form>
// //                         <div className='row'>
// //                             <Form.Group className='col-12 col-md-6 mb-3'>
// //                                 <Form.Label>Title</Form.Label>
// //                                 <Form.Control type="text" placeholder="Title" value={formData.title}
// //                                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                                 />
// //                             </Form.Group>
// //                             <Form.Group className='col-12 col-md-6 mb-3'>
// //                                 <Form.Label>Upload Image</Form.Label>
// //                                 <Form.Control
// //                                     type="file"
// //                                     accept="image/*"
// //                                     onChange={handleImageChange}
// //                                 />
// //                                 {imagePreview && (
// //                                     <img src={imagePreview} alt="Preview" className="mt-2" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
// //                                 )}
// //                             </Form.Group>
// //                             {loginID === '' ? (
// //                                 <Form.Group className='col-12 col-md-6 mb-3'>
// //                                     <Form.Label>Company</Form.Label>
// //                                     <Form.Select
// //                                         value={formData.companyId}
// //                                         onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
// //                                     >
// //                                         <option value="">Select Company</option>
// //                                         {companies.map((company) => (
// //                                             <option key={company?._id} value={company?._id} checked={formData.companyId === company._id}>
// //                                                 {company.name}
// //                                             </option>
// //                                         ))}
// //                                     </Form.Select>
// //                                 </Form.Group>
// //                             ) : ""}
// //                             <Form.Group className='col-12 mb-3'>
// //                                 <Form.Label>Description</Form.Label>
// //                                 <textarea
// //                                     name="description"
// //                                     className='form-control'
// //                                     rows={3}
// //                                     value={formData?.description}
// //                                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                                     placeholder="Description..."
// //                                 />
// //                             </Form.Group>
// //                             <Form.Group className='col-12 col-md-6 mb-3'>
// //                                 <Form.Label>Duration</Form.Label>
// //                                 <Form.Control type="text" placeholder="Duration" value={formData.duration}
// //                                     onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
// //                                 />
// //                             </Form.Group>
// //                             <Form.Group className='col-12 col-md-6 mb-3'>
// //                                 <Form.Label>Deadline</Form.Label>
// //                                 <Form.Control type="date" placeholder="Deadline" value={formData.deadline}
// //                                     onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
// //                                 />
// //                             </Form.Group>
// //                             <Form.Group className='col-12 col-md-6 mb-3'>
// //                                 <Form.Label>Type</Form.Label>
// //                                 <Form.Check
// //                                     type="radio"
// //                                     label="Full-Time"
// //                                     name="type"
// //                                     value="Full-Time"
// //                                     checked={formData.type === 'Full-Time'}
// //                                     onChange={(e) => setFormData({ ...formData, type: e.target.value })}
// //                                 />
// //                                 <Form.Check
// //                                     type="radio"
// //                                     label="Part-Time"
// //                                     name="type"
// //                                     value="Part-Time"
// //                                     checked={formData.type === 'Part-Time'}
// //                                     onChange={(e) => setFormData({ ...formData, type: e.target.value })}
// //                                 />
// //                             </Form.Group>
// //                             <Form.Group className='col-12 col-md-6 mb-3'>
// //                                 <Form.Label>Status</Form.Label>
// //                                 <Form.Check
// //                                     type="radio"
// //                                     label="Active"
// //                                     name="status"
// //                                     value="1"
// //                                     checked={formData.status === 1}
// //                                     onChange={(e) => setFormData({ ...formData, status: e.target.value })}
// //                                 />
// //                                 <Form.Check
// //                                     type="radio"
// //                                     label="Inactive"
// //                                     name="status"
// //                                     value="0"
// //                                     checked={formData.status === 0}
// //                                     onChange={(e) => setFormData({ ...formData, status: e.target.value })}
// //                                 />
// //                             </Form.Group>
// //                         </div>
// //                     </Form>
// //                 </Modal.Body>
// //                 <Modal.Footer>
// //                     <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
// //                     <Button variant="primary" onClick={handleSave}>Save</Button>
// //                 </Modal.Footer>
// //             </Modal>
// //         </section>
// //     );
// // };

// // export default Internships;
// import React, { useEffect, useState } from 'react';
// import { Table, Modal, Button, Form, Alert } from 'react-bootstrap';
// import axios from 'axios';

// const Internships = () => {
//     const [internships, setInternships] = useState([]);
//     const [companies, setCompanies] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [modalTitle, setModalTitle] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [errors, setErrors] = useState({});
//     const [serverError, setServerError] = useState('');

//     const loginID = localStorage.getItem('id');
//     const companyId = localStorage.getItem('companyId');

//     const [formData, setFormData] = useState({
//         title: '', 
//         companyId: companyId,
//         description: '', 
//         duration: '',
//         type: 'Full-Time', 
//         deadline: '',
//         status: 1, 
//         postedBy: loginID,
//         image: null,
//     });
//     const [editId, setEditId] = useState(null);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             // Validate image file
//             if (!file.type.match('image.*')) {
//                 setErrors({...errors, image: 'Please upload a valid image file'});
//                 return;
//             }
//             if (file.size > 2 * 1024 * 1024) { // 2MB limit
//                 setErrors({...errors, image: 'Image size should be less than 2MB'});
//                 return;
//             }
            
//             setFormData({ ...formData, image: file });
//             setImagePreview(URL.createObjectURL(file));
//             setErrors({...errors, image: null});
//         }
//     };

//     const handleOpenModal = () => {
//         setFormData({
//             title: '', 
//             companyId: companyId,
//             description: '', 
//             duration: '',
//             type: 'Full-Time', 
//             deadline: '',
//             status: 1, 
//             postedBy: loginID,
//             image: null,
//         });
//         setEditId(null);
//         setModalTitle('Create New Internship');
//         setShowModal(true);
//         setImagePreview('');
//         setErrors({});
//         setServerError('');
//     };

//     const handleCloseModal = () => setShowModal(false);

//     useEffect(() => {
//         fetchCompanies();
//         fetchInternships();
//     }, []);

//     const fetchCompanies = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/softwarehouses/');
//             setCompanies(response.data);
//         } catch (error) {
//             console.error('Failed to fetch companies:', error);
//         }
//     };

//     const fetchInternships = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/internships/${companyId}`);
//             setInternships(response.data);
//         } catch (error) {
//             console.error('Failed to fetch internships:', error);
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         // Title validation
//         if (!formData.title.trim()) {
//             newErrors.title = 'Title is required';
//         } else if (formData.title.length > 100) {
//             newErrors.title = 'Title should be less than 100 characters';
//         }

//         // Description validation
//         if (!formData.description.trim()) {
//             newErrors.description = 'Description is required';
//         } else if (formData.description.length > 1000) {
//             newErrors.description = 'Description should be less than 1000 characters';
//         }

//         // Duration validation
//         if (!formData.duration.trim()) {
//             newErrors.duration = 'Duration is required';
//         } else if (!/^\d+\s*(month|year)s?$/i.test(formData.duration)) {
//             newErrors.duration = 'Duration should be in format like "3 months" or "1 year"';
//         }

//         // Deadline validation
//         if (!formData.deadline) {
//             newErrors.deadline = 'Deadline is required';
//         } else {
//             const deadlineDate = new Date(formData.deadline);
//             deadlineDate.setHours(0, 0, 0, 0);
            
//             if (deadlineDate < today) {
//                 newErrors.deadline = 'Deadline cannot be in the past';
//             } else if (deadlineDate > new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000)) {
//                 newErrors.deadline = 'Deadline cannot be more than 1 year in the future';
//             }
//         }

//         // Company validation (only if not logged in as a company)
//         if (!loginID && !formData.companyId) {
//             newErrors.companyId = 'Company is required';
//         }

//         // Image validation (only for new internships)
//         if (!editId && !formData.image) {
//             newErrors.image = 'Image is required';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSave = async () => {
//         if (!validateForm()) return;

//         try {
//             const formDataToSend = new FormData();
//             formDataToSend.append('title', formData.title);
//             formDataToSend.append('companyId', formData.companyId);
//             formDataToSend.append('description', formData.description);
//             formDataToSend.append('duration', formData.duration);
//             formDataToSend.append('type', formData.type);
//             formDataToSend.append('deadline', formData.deadline);
//             formDataToSend.append('status', formData.status);
//             formDataToSend.append('postedBy', formData.postedBy);

//             if (formData.image) {
//                 formDataToSend.append('image', formData.image);
//             }

//             if (editId) {
//                 await axios.put(`http://localhost:5000/api/internships/${editId}`, formDataToSend, {
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                 });
//                 setInternships((prevData) =>
//                     prevData.map((item) => (item._id === editId ? { ...item, ...formData } : item))
//                 );
//             } else {
//                 const response = await axios.post('http://localhost:5000/api/internships', formDataToSend, {
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                 });
//                 setInternships((prevData) => [...prevData, response.data]);
//             }

//             setShowModal(false);
//             setFormData({
//                 title: '',
//                 companyId: companyId,
//                 description: '',
//                 duration: '',
//                 type: 'Full-Time',
//                 deadline: '',
//                 status: 1,
//                 postedBy: loginID,
//                 image: null,
//             });
//             setImagePreview(null);
//             setEditId(null);
//         } catch (error) {
//             console.error('Error saving record:', error);
//             setServerError(error.response?.data?.message || 'Failed to save record. Please try again.');
//         }
//     };

//     const handleEdit = (item) => {
//         setFormData({
//             title: item?.title,
//             companyId: item?.companyId,
//             description: item?.description, 
//             duration: item?.duration, 
//             type: item.type,
//             deadline: item?.deadline, 
//             status: item?.status, 
//             postedBy: item?.postedBy,
//             image: item.image,
//         });
//         setImagePreview(item.image ? `/src/assets/images/${item.image}` : null);
//         setEditId(item._id);
//         setModalTitle('Edit Internship');
//         setShowModal(true);
//         setErrors({});
//         setServerError('');
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this internship?')) {
//             try {
//                 await axios.delete(`http://localhost:5000/api/internships/${id}`);
//                 setInternships((prevData) => prevData.filter((item) => item._id !== id));
//                 alert('Internship deleted successfully');
//             } catch (error) {
//                 console.error('Error deleting internship:', error);
//                 alert('Failed to delete internship. Please try again.');
//             }
//         }
//     };

//     return (
//         <section className="bg-white p-4 rounded">
//             <h2 className="text-lg font-bold">Internships</h2>
//             <Button variant="primary" onClick={handleOpenModal} style={{ marginBottom: '10px', float: 'right' }}>+ Add Internship</Button>
//             <div className="table-responsive">
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th>Company</th>
//                             <th>Title</th>
//                             <th>Duration</th>
//                             <th>Type</th>
//                             <th>Deadline</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {internships.map((item) => (
//                             <tr key={item?._id}>
//                                 <td>{item?.companyDetails?.name}</td>
//                                 <td>{item?.title}</td>
//                                 <td>{item?.duration}</td>
//                                 <td>{item?.type}</td>
//                                 <td>{new Date(item.deadline).toLocaleDateString()}</td>
//                                 <td>
//                                     <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>Edit</Button>{' '}
//                                     <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>Delete</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </div>
//             <Modal show={showModal} onHide={handleCloseModal} size='lg'>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{modalTitle}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {serverError && <Alert variant="danger">{serverError}</Alert>}
//                     <Form>
//                         <div className='row'>
//                             <Form.Group className='col-12 col-md-6 mb-3'>
//                                 <Form.Label>Title *</Form.Label>
//                                 <Form.Control 
//                                     type="text" 
//                                     placeholder="Title" 
//                                     value={formData.title}
//                                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                                     isInvalid={!!errors.title}
//                                 />
//                                 <Form.Control.Feedback type="invalid">
//                                     {errors.title}
//                                 </Form.Control.Feedback>
//                             </Form.Group>
//                             <Form.Group className='col-12 col-md-6 mb-3'>
//                                 <Form.Label>{editId ? 'Update Image' : 'Upload Image *'}</Form.Label>
//                                 <Form.Control
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleImageChange}
//                                     isInvalid={!!errors.image}
//                                 />
//                                 <Form.Control.Feedback type="invalid">
//                                     {errors.image}
//                                 </Form.Control.Feedback>
//                                 {imagePreview && (
//                                     <img 
//                                         src={imagePreview} 
//                                         alt="Preview" 
//                                         className="mt-2" 
//                                         style={{ 
//                                             width: '100px', 
//                                             height: '100px', 
//                                             objectFit: 'cover', 
//                                             borderRadius: '5px' 
//                                         }} 
//                                     />
//                                 )}
//                             </Form.Group>
//                             {!loginID && (
//                                 <Form.Group className='col-12 col-md-6 mb-3'>
//                                     <Form.Label>Company *</Form.Label>
//                                     <Form.Select
//                                         value={formData.companyId}
//                                         onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
//                                         isInvalid={!!errors.companyId}
//                                     >
//                                         <option value="">Select Company</option>
//                                         {companies.map((company) => (
//                                             <option key={company?._id} value={company?._id}>
//                                                 {company.name}
//                                             </option>
//                                         ))}
//                                     </Form.Select>
//                                     <Form.Control.Feedback type="invalid">
//                                         {errors.companyId}
//                                     </Form.Control.Feedback>
//                                 </Form.Group>
//                             )}
//                             <Form.Group className='col-12 mb-3'>
//                                 <Form.Label>Description *</Form.Label>
//                                 <Form.Control
//                                     as="textarea"
//                                     rows={3}
//                                     value={formData.description}
//                                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                     placeholder="Description..."
//                                     isInvalid={!!errors.description}
//                                 />
//                                 <Form.Control.Feedback type="invalid">
//                                     {errors.description}
//                                 </Form.Control.Feedback>
//                                 <div className="text-end">
//                                     <small>{formData.description.length}/1000 characters</small>
//                                 </div>
//                             </Form.Group>
//                             <Form.Group className='col-12 col-md-6 mb-3'>
//                                 <Form.Label>Duration *</Form.Label>
//                                 <Form.Control 
//                                     type="text" 
//                                     placeholder="e.g., 3 months or 1 year" 
//                                     value={formData.duration}
//                                     onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                                     isInvalid={!!errors.duration}
//                                 />
//                                 <Form.Control.Feedback type="invalid">
//                                     {errors.duration}
//                                 </Form.Control.Feedback>
//                             </Form.Group>
//                             <Form.Group className='col-12 col-md-6 mb-3'>
//                                 <Form.Label>Deadline *</Form.Label>
//                                 <Form.Control 
//                                     type="date" 
//                                     min={new Date().toISOString().split('T')[0]}
//                                     max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
//                                     value={formData.deadline}
//                                     onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
//                                     isInvalid={!!errors.deadline}
//                                 />
//                                 <Form.Control.Feedback type="invalid">
//                                     {errors.deadline}
//                                 </Form.Control.Feedback>
//                             </Form.Group>
//                             <Form.Group className='col-12 col-md-6 mb-3'>
//                                 <Form.Label>Type</Form.Label>
//                                 <div>
//                                     <Form.Check
//                                         inline
//                                         type="radio"
//                                         label="Full-Time"
//                                         name="type"
//                                         value="Full-Time"
//                                         checked={formData.type === 'Full-Time'}
//                                         onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//                                     />
//                                     <Form.Check
//                                         inline
//                                         type="radio"
//                                         label="Part-Time"
//                                         name="type"
//                                         value="Part-Time"
//                                         checked={formData.type === 'Part-Time'}
//                                         onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//                                     />
//                                 </div>
//                             </Form.Group>
//                             <Form.Group className='col-12 col-md-6 mb-3'>
//                                 <Form.Label>Status</Form.Label>
//                                 <div>
//                                     <Form.Check
//                                         inline
//                                         type="radio"
//                                         label="Active"
//                                         name="status"
//                                         value={1}
//                                         checked={formData.status == 1}
//                                         onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
//                                     />
//                                     <Form.Check
//                                         inline
//                                         type="radio"
//                                         label="Inactive"
//                                         name="status"
//                                         value={0}
//                                         checked={formData.status == 0}
//                                         onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value) })}
//                                     />
//                                 </div>
//                             </Form.Group>
//                         </div>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//                     <Button variant="primary" onClick={handleSave}>Save</Button>
//                 </Modal.Footer>
//             </Modal>
//         </section>
//     );
// };

// export default Internships;

import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const loginID = localStorage.getItem("id");
  const companyId = localStorage.getItem("companyId");

  const [formData, setFormData] = useState({
    title: "",
    companyId: companyId,
    description: "",
    duration: "",
    type: "Full-Time",
    deadline: "",
    status: 1,
    postedBy: loginID,
    image: null,
  });
  const [editId, setEditId] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        setErrors({ ...errors, image: "Please upload a valid image file" });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size should be less than 2MB" });
        return;
      }
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
      setErrors({ ...errors, image: null });
    }
  };

  const handleOpenModal = () => {
    setFormData({
      title: "",
      companyId: companyId,
      description: "",
      duration: "",
      type: "Full-Time",
      deadline: "",
      status: 1,
      postedBy: loginID,
      image: null,
    });
    setEditId(null);
    setModalTitle("Create New Internship");
    setShowModal(true);
    setImagePreview("");
    setErrors({});
    setServerError("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImagePreview(null);
    URL.revokeObjectURL(imagePreview);
  };

  useEffect(() => {
    fetchCompanies();
    fetchInternships();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/softwarehouses/");
      setCompanies(response.data);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      toast.error("Failed to load companies.");
    }
  };

  const fetchInternships = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/internships/${companyId}`);
      setInternships(response.data);
    } catch (error) {
      console.error("Failed to fetch internships:", error);
      toast.error("Failed to load internships.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title should be less than 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description should be less than 1000 characters";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    } else if (!/^\d+\s*(month|year)s?$/i.test(formData.duration)) {
      newErrors.duration = 'Duration should be in format like "3 months" or "1 year"';
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    } else {
      const deadlineDate = new Date(formData.deadline);
      deadlineDate.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        newErrors.deadline = "Deadline cannot be in the past";
      } else if (deadlineDate > new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000)) {
        newErrors.deadline = "Deadline cannot be more than 1 year in the future";
      }
    }

    if (!loginID && !formData.companyId) {
      newErrors.companyId = "Company is required";
    }

    if (!editId && !formData.image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("companyId", formData.companyId);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("deadline", formData.deadline);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("postedBy", formData.postedBy);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      if (editId) {
        await axios.put(`http://localhost:5000/api/internships/${editId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setInternships((prevData) =>
          prevData.map((item) =>
            item._id === editId ? { ...item, ...formData, image: formData.image || item.image } : item
          )
        );
        toast.success("Internship updated successfully!");
      } else {
        const response = await axios.post("http://localhost:5000/api/internships", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setInternships((prevData) => [...prevData, response.data]);
        toast.success("Internship created successfully!");
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error saving record:", error);
      setServerError(error.response?.data?.message || "Failed to save internship. Please try again.");
      toast.error("Failed to save internship.");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item?.title || "",
      companyId: item?.companyId || companyId,
      description: item?.description || "",
      duration: item?.duration || "",
      type: item?.type || "Full-Time",
      deadline: item?.deadline ? item.deadline.split("T")[0] : "",
      status: item?.status ?? 1,
      postedBy: item?.postedBy || loginID,
      image: item.image || null,
    });
    setImagePreview(item.image ? `http://localhost:5000/${item.image}` : null);
    setEditId(item._id);
    setModalTitle("Edit Internship");
    setShowModal(true);
    setErrors({});
    setServerError("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      try {
        await axios.delete(`http://localhost:5000/api/internships/${id}`);
        setInternships((prevData) => prevData.filter((item) => item._id !== id));
        toast.success("Internship deleted successfully!");
      } catch (error) {
        console.error("Error deleting internship:", error);
        toast.error("Failed to delete internship.");
      }
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Internships</h2>
        <Button
          variant="primary"
          onClick={handleOpenModal}
          className="!bg-blue-600 !border-blue-600 hover:!bg-blue-700"
        >
          + Add Internship
        </Button>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Duration</th>
              <th>Type</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((item) => (
              <tr key={item?._id}>
                <td>{item?.companyDetails?.name || "N/A"}</td>
                <td>{item?.title || "Untitled"}</td>
                <td>{item?.duration || "N/A"}</td>
                <td>{item?.type || "N/A"}</td>
                <td>{item.deadline ? new Date(item.deadline).toLocaleDateString() : "N/A"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="!bg-yellow-500 !border-yellow-500 hover:!bg-yellow-600 mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                    className="!bg-red-600 !border-red-600 hover:!bg-red-700"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">{modalTitle}</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {serverError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{serverError}</div>
              )}
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="col-span-1">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter internship title"
                    aria-invalid={!!errors.title}
                    aria-describedby={errors.title ? "title-error" : undefined}
                  />
                  {errors.title && (
                    <p id="title-error" className="mt-1 text-sm text-red-500">
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="col-span-1">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    {editId ? "Update Image" : "Upload Image"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.image ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-invalid={!!errors.image}
                    aria-describedby={errors.image ? "image-error" : undefined}
                  />
                  {errors.image && (
                    <p id="image-error" className="mt-1 text-sm text-red-500">
                      {errors.image}
                    </p>
                  )}
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 w-24 h-24 object-cover rounded-md border border-gray-200"
                    />
                  )}
                </div>

                {/* Company (Admin Only) */}
                {!loginID && (
                  <div className="col-span-1">
                    <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 mb-1">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="companyId"
                      value={formData.companyId}
                      onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.companyId ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-invalid={!!errors.companyId}
                      aria-describedby={errors.companyId ? "companyId-error" : undefined}
                    >
                      <option value="">Select Company</option>
                      {companies.map((company) => (
                        <option key={company?._id} value={company?._id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                    {errors.companyId && (
                      <p id="companyId-error" className="mt-1 text-sm text-red-500">
                        {errors.companyId}
                      </p>
                    )}
                  </div>
                )}

                {/* Description */}
                <div className="col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Describe the internship..."
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? "description-error" : undefined}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.description && (
                      <p id="description-error" className="text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 ml-auto">
                      {formData.description.length}/1000 characters
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="col-span-1">
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.duration ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., 3 months or 1 year"
                    aria-invalid={!!errors.duration}
                    aria-describedby={errors.duration ? "duration-error" : undefined}
                  />
                  {errors.duration && (
                    <p id="duration-error" className="mt-1 text-sm text-red-500">
                      {errors.duration}
                    </p>
                  )}
                </div>

                {/* Deadline */}
                <div className="col-span-1">
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    min={new Date().toISOString().split("T")[0]}
                    max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.deadline ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-invalid={!!errors.deadline}
                    aria-describedby={errors.deadline ? "deadline-error" : undefined}
                  />
                  {errors.deadline && (
                    <p id="deadline-error" className="mt-1 text-sm text-red-500">
                      {errors.deadline}
                    </p>
                  )}
                </div>

                {/* Type */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <div className="flex space-x-4">
                    {["Full-Time", "Part-Time"].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={formData.type === type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="mr-2 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex space-x-4">
                    {[
                      { label: "Active", value: 1 },
                      { label: "Inactive", value: 0 },
                    ].map((status) => (
                      <label key={status.value} className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value={status.value}
                          checked={formData.status == status.value}
                          onChange={(e) =>
                            setFormData({ ...formData, status: parseInt(e.target.value) })
                          }
                          className="mr-2 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{status.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200 space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Internships;