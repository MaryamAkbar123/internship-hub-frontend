import React from 'react';
import { Table, Button } from 'react-bootstrap'; 

const DataTable = ({ data, handleEdit, handleDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>Edit</Button>{' '}
              <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
