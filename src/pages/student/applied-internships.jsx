import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Badge, Spinner, Alert, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { FaClock, FaBuilding, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const AppliedInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });
  const studentId = localStorage.getItem('id');
  const navigate = useNavigate();

  const fetchAppliedInternships = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://internship-hub-backend.vercel.app/api/internships/applied-internships/${studentId}`
      );
      console.log(response.data);
      setInternships(response.data.applications);
      console.log(response.data.applications);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        total: response.data.total,
        pages: response.data.pages
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch applied internships');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedInternships();
  }, []);

  const handlePageChange = (page) => {
    fetchAppliedInternships(page);
  };

  const handleViewDetails = (internshipId) => {
    navigate(`/internship/${internshipId}`);
  };

  const getStatusBadge = (status) => {
    return status === 1 ? (
      <Badge bg="success">Approved</Badge>
    ) : (
      <Badge bg="warning" text="dark">Pending</Badge>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && !internships.length) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4">
        {error}
      </Alert>
    );
  }

  if (!loading && internships.length === 0) {
    return (
      <div className="text-center my-5 py-4">
        <FaInfoCircle size={48} className="text-muted mb-3" />
        <h5>No Applied Internships Found</h5>
        <p className="text-muted">You haven't applied to any internships yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h2 className="h5 mb-4 d-flex align-items-center">
        <FaBuilding className="text-primary me-2" />
        My Applied Internships
      </h2>

      <div className="table-responsive">
        <Table hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Internship</th>
              <th>Company</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {internships.map((item, index) => (
              <tr key={item.applicationId}>
               
                <td>
                  <div className="d-flex align-items-center">
                    <div>
                      <h6 className="mb-0 fw-bold">{item.internship.title || NA}</h6>
                    </div>
                  </div>
                </td>
                <td>
                  {item.internship.company ? (
                    <>
                      <div className="fw-semibold">{item.internship.company.name}</div>
                      <small className="text-muted">{item.internship.company.email}</small>
                    </>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <FaClock className="text-muted me-2" />
                    <span>{item.internship.type}</span>
                  </div>
                </td>
                 <td>
                  <div className="d-flex align-items-center">
                    <FaClock className="text-muted me-2" />
                    <span>{item.internship.duration}</span>
                  </div>
                </td>
                <td>
                  {getStatusBadge(item.status)}
                </td>
               
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {pagination.pages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First 
              onClick={() => handlePageChange(1)} 
              disabled={pagination.page === 1} 
            />
            <Pagination.Prev 
              onClick={() => handlePageChange(pagination.page - 1)} 
              disabled={pagination.page === 1} 
            />
            
            {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
              let pageNum;
              if (pagination.pages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= pagination.pages - 2) {
                pageNum = pagination.pages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }
              
              return (
                <Pagination.Item
                  key={pageNum}
                  active={pageNum === pagination.page}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Pagination.Item>
              );
            })}

            <Pagination.Next 
              onClick={() => handlePageChange(pagination.page + 1)} 
              disabled={pagination.page === pagination.pages} 
            />
            <Pagination.Last 
              onClick={() => handlePageChange(pagination.pages)} 
              disabled={pagination.page === pagination.pages} 
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default AppliedInternships;