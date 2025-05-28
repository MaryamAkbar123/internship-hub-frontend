import React from "react";
import { Modal, Button, Form} from 'react-bootstrap';

const CustomModal = ({ show, handleClose, handleSave, formData, setFormData }) => {
    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" value={formData.name}
                            onChange={ (e) => setFormData({ ...formData, name: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={formData.email}
                            onChange={ (e) => setFormData({ ...formData, email: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={formData.password}
                            onChange={ (e) => setFormData({ ...formData, password: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                            <option value="softwarehouse">Software House</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default CustomModal;