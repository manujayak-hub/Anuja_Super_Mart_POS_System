import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import EmployeeDetails from './EmployeeDetails';
import EmployeeForm from './EmployeeForm';
import AddEmployeeForm from './AddEmployeeForm';
import SideBar from '../../components/EmployeeComponents/empSideBar';
import { Modal, Button } from 'react-bootstrap';

const Emp_list = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/emp');
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filtered employees with all employees
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Function to handle changes in the search query
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Filter employees based on the search query
    const filtered = employees.filter(employee =>
      employee.empName.toLowerCase().includes(event.target.value.toLowerCase()) ||
      employee.empID.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  // Pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };

  const handleUpdateEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true);
  };

  const handleRemoveEmployee = (id) => {
    axios.delete(`/emp/${id}`).then(() => {
      setEmployees(employees.filter(employee => employee._id !== id));
      setShowDetailsModal(false);
    }).catch((error) => {
      console.error("Error removing employee:", error);
    });
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddEmployee = (newEmployee) => {
    // Add new employee to the employees array
    setEmployees([...employees, newEmployee]);
    // Close the modal
    setShowAddModal(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <style>
  {`
    body {
      background-color: #D8D1D1;
    }
    .pagination .page-link {
      color: #FD204F !important;
      background-color: #fff;
      border-color: #FD204F;
    }
    .pagination .page-link:hover {
      color: #fff !important;
      background-color: #FD204F;
      border-color: #FD204F;
    }
    .pagination .page-item.active .page-link {
      color: #fff !important;
      background-color: #FD204F;
      border-color: #FD204F;
    }
    .emp_search-bar-container {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .emp_search-bar {
      flex: 1;
      border-radius: 20px;
      padding: 10px;
      margin-right: 20px; /* Reduced margin for search bar */
      border: 1px solid #ccc;
    }
    .emp_add-employee-btn {
      background-color: #FD204F;
      border-color: #FD204F;
      color: #fff;
    }
    .emp_add-employee-btn:hover {
      background-color: #FD204F;
      border-color: #FD204F;
      color: #fff;
    }
  `}
</style>

      <SideBar/>
      <div className="content" style={{ marginLeft: '250px', marginRight: '50px', padding: '20px' }}>
        <div className="emp_search-bar-container">
          <input
            type="text"
            placeholder="Search by Name or ID"
            value={searchQuery}
            onChange={handleSearch}
            className="emp_search-bar"
          />
          <Button className="emp_add-employee-btn" onClick={handleShowAddModal}>
            Add Employee
          </Button>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', margin: '0px 5px' }}>
          <h1>Employee List</h1>
          {currentEmployees.length > 0 ? (
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
                {currentEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.empID}</td>
                    <td>{employee.empName}</td>
                    <td>{employee.empRole}</td>
                    <td>{new Date(employee.empJoinedDate).toLocaleDateString()}</td>{/* Format joined date */}
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ backgroundColor: '#FD204F', '--bs-btn-padding-y': '.25rem', '--bs-btn-padding-x': '.5rem', '--bs-btn-font-size': '.75rem', marginRight: '5px', width: '70px' }}
                        onClick={() => handleViewDetails(employee)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ backgroundColor: '#28a745', '--bs-btn-padding-y': '.25rem', '--bs-btn-padding-x': '.5rem', '--bs-btn-font-size': '.75rem', width: '70px' }}
                        onClick={() => handleUpdateEmployee(employee)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No employees found.</p>
          )}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>&laquo;</button>
              </li>
              {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(i + 1)} className="page-link">
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === Math.ceil(filteredEmployees.length / employeesPerPage) ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>&raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <EmployeeDetails
              employee={selectedEmployee}
              handleRemove={handleRemoveEmployee}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && <EmployeeForm employee={selectedEmployee} handleClose={handleCloseUpdateModal} />}
        </Modal.Body>
      </Modal>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddEmployeeForm handleClose={handleCloseAddModal} handleAddEmployee={handleAddEmployee} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Emp_list;
