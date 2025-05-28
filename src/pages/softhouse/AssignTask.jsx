// import React, { useEffect, useState } from 'react';
// import { Table, Modal, Button, Form } from 'react-bootstrap';
// import axios from 'axios';

// const AssignTask = () => {
//     const [tasks, setTasks] = useState([]);
//     const [applicants, setApplicants] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [modalTitle, setModalTitle] = useState(null);
//     const companyId = localStorage.getItem('companyId');
//     const [formData, setFormData] = useState({ title: '', description: '', deadline: '', studentId: [], assignBy: companyId });
//     const [editId, setEditId] = useState(null);

//     const handleOpenModal = () => {
//         setFormData({ title: '', description: '', deadline: '', studentId: [], assignBy: companyId });
//         setEditId(null);
//         setModalTitle('Create New Task');
//         setShowModal(true);
//     };

//     const handleCloseModal = () => setShowModal(false);

//     useEffect(() => {
//         fetchApplicants();
//         fetchTasks();
//     }, [showModal]);

//     const fetchTasks = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/tasks/${companyId}`);
//             setTasks(response.data);
//         } catch (error) {
//             console.error('Failed to fetch tasks:', error);
//         }
//     };

//     const fetchApplicants = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/applications/${companyId}`);
//             setApplicants(response.data);
//         } catch (error) {
//             console.error('Failed to fetch applicants:', error);
//         }
//     };

//     const handleSave = async () => {
//         try {
//             if (editId) {
//                 await axios.put(`http://localhost:5000/api/tasks/${editId}`, formData);
//                 setTasks((prevData) =>
//                     prevData.map((item) =>
//                         item._id === editId ? { ...item, ...formData } : item
//                     )
//                 );
//             } else {
//                 const response = await axios.post('http://localhost:5000/api/tasks', formData);
//                 setTasks((prevData) => [...prevData, response.data]);
//             }
//             setShowModal(false);
//             setFormData({ title: '', description: '', deadline: '', studentId: [], assignBy: companyId });
//             setEditId(null);
//         } catch (error) {
//             console.error('Error saving record:', error);
//             alert('Failed to save record. Please try again.');
//         }
//     };

//     const handleEdit = (item) => {
//         setFormData({ title: item.title, description: item.description, deadline: item.deadline, studentId: item.studentId });
//         setEditId(item._id);
//         setModalTitle('Edit Task');
//         setShowModal(true);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//             setTasks((prevData) => prevData.filter((item) => item._id !== id));
//             alert('Task deleted successfully');
//         } catch (error) {
//             console.error('Error deleting task:', error);
//             alert('Failed to delete task. Please try again.');
//         }
//     };

//     const handleStudentChange = (e) => {
//         const selectedStudents = Array.from(e.target.selectedOptions, (option) => option.value);
//         setFormData({ ...formData, studentId: selectedStudents });
//     };

//     return (
//         <section className="bg-white p-4 rounded">
//             <h2 className="text-lg font-bold">Assign Tasks</h2>
//             <Button variant="primary" onClick={handleOpenModal} style={{ marginBottom: '10px', float: 'right' }}>+ Add Task</Button>
//             <div className="table-responsive">
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th>Applicant</th>
//                             <th>Title</th>
//                             <th>Description</th>
//                             <th>Deadline</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tasks.map((item) => (
//                             <tr key={item._id}>
//                                 <td>{item.std?.name || 'Unknown'}</td>
//                                 <td>{item.title}</td>
//                                 <td>{item.description}</td>
//                                 <td>{new Date(item.deadline).toLocaleString()}</td>
//                                 <td>
//                                     <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>Edit</Button>{' '}
//                                     <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>Delete</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </div>
//             <Modal show={showModal} onHide={handleCloseModal} size="lg">
//                 <Modal.Header closeButton>
//                     <Modal.Title>{modalTitle}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <div className="row">
//                             <Form.Group className="col-12 mb-3">
//                                 <Form.Label>Title</Form.Label>
//                                 <Form.Control type="text" placeholder="Title" value={formData.title}
//                                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                                 />
//                             </Form.Group>
//                             <Form.Group className="col-12 mb-3">
//                                 <Form.Label>Description</Form.Label>
//                                 <textarea
//                                     name="description"
//                                     className="form-control"
//                                     rows={5}
//                                     value={formData.description}
//                                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                     placeholder="Description..."
//                                 />
//                             </Form.Group>
//                             <Form.Group className="col-md-6 col-12 mb-3">
//                                 <Form.Label>Applicants</Form.Label>
//                                 <Form.Select
//                                     multiple
//                                     value={formData.studentId}
//                                     onChange={handleStudentChange}
//                                 >
//                                     <option value="">Select Applicants</option>
//                                     {applicants.map((app) => (
//                                         <option key={app.studentId} value={app.studentId}>
//                                             {app.user.name}
//                                         </option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                             <Form.Group className="col-md-6 col-12 mb-3">
//                                 <Form.Label>Deadline</Form.Label>
//                                 <Form.Control
//                                     type="date"
//                                     placeholder="Deadline"
//                                     value={formData.deadline}
//                                     onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
//                                 />
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

// export default AssignTask;
import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AssignTask = () => {
    const [tasks, setTasks] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState(null);
    const companyId = localStorage.getItem('companyId');
    const [formData, setFormData] = useState({ 
        title: '', 
        description: '', 
        deadline: '', 
        studentId: [], 
        assignBy: companyId 
    });
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        deadline: '',
        studentId: ''
    });
    const [editId, setEditId] = useState(null);

    const handleOpenModal = () => {
        setFormData({ title: '', description: '', deadline: '', studentId: [], assignBy: companyId });
        setErrors({
            title: '',
            description: '',
            deadline: '',
            studentId: ''
        });
        setEditId(null);
        setModalTitle('Create New Task');
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        fetchApplicants();
        fetchTasks();
    }, [showModal]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/tasks/${companyId}`);
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    const fetchApplicants = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/applications/${companyId}`);
            setApplicants(response.data);
        } catch (error) {
            console.error('Failed to fetch applicants:', error);
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            title: '',
            description: '',
            deadline: '',
            studentId: ''
        };

        // Title validation
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            valid = false;
        } else if (formData.title.length > 100) {
            newErrors.title = 'Title must be less than 100 characters';
            valid = false;
        }

        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
            valid = false;
        } else if (formData.description.length > 500) {
            newErrors.description = 'Description must be less than 500 characters';
            valid = false;
        }

        // Deadline validation
        if (!formData.deadline) {
            newErrors.deadline = 'Deadline is required';
            valid = false;
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(formData.deadline);
            
            if (selectedDate < today) {
                newErrors.deadline = 'Deadline must be today or in the future';
                valid = false;
            }
        }

        // Student validation
        if (formData.studentId.length === 0) {
            newErrors.studentId = 'At least one applicant must be selected';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/tasks/${editId}`, formData);
                setTasks((prevData) =>
                    prevData.map((item) =>
                        item._id === editId ? { ...item, ...formData } : item
                    )
                );
            } else {
                const response = await axios.post('http://localhost:5000/api/tasks', formData);
                setTasks((prevData) => [...prevData, response.data]);
            }
            setShowModal(false);
            setFormData({ title: '', description: '', deadline: '', studentId: [], assignBy: companyId });
            setEditId(null);
        } catch (error) {
            console.error('Error saving record:', error);
            alert('Failed to save record. Please try again.');
        }
    };

    const handleEdit = (item) => {
        setFormData({ 
            title: item.title, 
            description: item.description, 
            deadline: item.deadline ? new Date(item.deadline).toISOString().split('T')[0] : '', 
            studentId: item.studentId,
            assignBy: companyId
        });
        setEditId(item._id);
        setModalTitle('Edit Task');
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`http://localhost:5000/api/tasks/${id}`);
                setTasks((prevData) => prevData.filter((item) => item._id !== id));
                alert('Task deleted successfully');
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Failed to delete task. Please try again.');
            }
        }
    };

    const handleStudentChange = (e) => {
        const selectedStudents = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({ ...formData, studentId: selectedStudents });
        // Clear error when user selects something
        if (selectedStudents.length > 0) {
            setErrors({...errors, studentId: ''});
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user starts typing
        if (value.trim() && errors[name]) {
            setErrors({...errors, [name]: ''});
        }
    };

    return (
        <section className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold">Assign Tasks</h2>
            <Button variant="primary" onClick={handleOpenModal} style={{ marginBottom: '10px', float: 'right' }}>+ Add Task</Button>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    {item.studentId && item.studentId.length > 0 ? (
                                        applicants
                                            .filter(app => item.studentId.includes(app.studentId))
                                            .map(app => app.user?.name)
                                            .join(', ') || 'Unknown'
                                    ) : 'No applicants assigned'}
                                </td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.deadline ? new Date(item.deadline).toLocaleDateString() : 'No deadline'}</td>
                                <td>
                                    <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>Edit</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row">
                            <Form.Group className="col-12 mb-3">
                                <Form.Label>Title *</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="title"
                                    placeholder="Title" 
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="col-12 mb-3">
                                <Form.Label>Description *</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    rows={5}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Description..."
                                    isInvalid={!!errors.description}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="col-md-6 col-12 mb-3">
                                <Form.Label>Applicants *</Form.Label>
                                <Form.Select
                                    multiple
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleStudentChange}
                                    isInvalid={!!errors.studentId}
                                >
                                    {applicants.map((app) => (
                                        <option key={app.studentId} value={app.studentId}>
                                            {app.user?.name || 'Unknown'}
                                        </option>
                                    ))}
                                </Form.Select>
                                {errors.studentId && (
                                    <div className="text-danger" style={{ fontSize: '0.875em', marginTop: '0.25rem' }}>
                                        {errors.studentId}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group className="col-md-6 col-12 mb-3">
                                <Form.Label>Deadline *</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="deadline"
                                    placeholder="Deadline"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={formData.deadline}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.deadline}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.deadline}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default AssignTask;