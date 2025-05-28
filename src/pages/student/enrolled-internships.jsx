import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Badge, Card, Image } from "react-bootstrap";
import axios from "axios";
import { FaCalendarAlt, FaBuilding, FaClock, FaFileAlt, FaEye } from "react-icons/fa";

const ApprovedInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem("id");
  const navigate = useNavigate();

  const fetchApprovedInternships = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/internships/approved/${studentId}`
      );
      setInternships(response.data.internships || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch approved internships:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedInternships();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

 

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <Card className="text-center p-4 border-0 shadow-sm">
        <Card.Body>
          <Card.Title className="text-muted">No Approved Internships</Card.Title>
          <Card.Text>
            You haven't been approved for any internships yet.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <section className="p-4 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h5 fw-bold mb-0">
          <FaBuilding className="text-primary me-2" />
          Approved Internships
        </h2>
        
      </div>

      <div className="table-responsive">
        <Table hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th width="5%">#</th>
              <th width="30%">Internship</th>
              <th width="25%">Company</th>
              <th width="15%">Type</th>
              <th width="15%">Duration</th>
              <th width="10%">Status</th>
              
            </tr>
          </thead>
          <tbody>
            {internships.map((internship, index) => (
              <tr key={internship._id} className="cursor-pointer">
                <td>{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center">
                  
                    <div>
                      <h6 className="mb-0 fw-bold">{internship.title}</h6>
                    </div>
                  </div>
                </td>
                <td>
                  {internship.company ? (
                    <>
                      <div className="fw-semibold">{internship.company.name}</div>
                      <small className="text-muted">{internship.company.email}</small>
                    </>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
                  <td>
                  <div className="d-flex align-items-center">
                   <FaFileAlt className="me-1" />
                    <span className="text-muted">
                        {internship.type}
                      </span>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <FaClock className="text-muted me-2" />
                    <span>{internship.duration}</span>
                  </div>
                </td>
              
                <td>
                  <Badge pill bg="success" className="px-2 py-1">
                    Approved
                  </Badge>
                </td>
            
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default ApprovedInternships;