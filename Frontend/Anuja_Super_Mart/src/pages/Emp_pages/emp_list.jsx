import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import EmployeeDetails from './EmployeeDetails';
import { Modal, Button } from 'react-bootstrap'; // Import the Modal and Button components from React Bootstrap

const Emp_list = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/emp');
        setEmployees(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button type="button" className="btn btn-primary" style={{ backgroundColor: '#FD204F' }}>Add Employee</button>
      </div>
      <div>
        <h1>Employee List</h1>
        {employees.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.empID}</td>
                  <td>{employee.empName}</td>
                  <td>{employee.empRole}</td>
                  <td>{employee.empJoinedDate}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ backgroundColor: '#FD204F', '--bs-btn-padding-y': '.25rem', '--bs-btn-padding-x': '.5rem', '--bs-btn-font-size': '.75rem' }}
                      onClick={() => handleViewDetails(employee)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No employees found.</p>
        )}
      </div>
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Emp_list;