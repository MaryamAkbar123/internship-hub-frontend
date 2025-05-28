import React from "react";
import { Table, Button } from "react-bootstrap";

const DataTable = ({ data, columns }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((col) => (
            <th className="border-b p-2" key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td className="border-b p-2" key={col.key}>{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
