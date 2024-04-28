import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import SideBar from '../../components/EmployeeComponents/empSideBar';

const Emp_Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleAbsent = async (id) => {
    if (window.confirm('Are you sure you want to mark this employee as absent?')) {
      try {
        const response = await axios.patch(`/emp/${id}`, { action: 'absent' });
        if (response.status === 200) {
          const updatedEmployees = employees.map(emp => {
            if (emp._id === id && emp.empRemainingLeaves > 0) {
              return {
                ...emp,
                empRemainingLeaves: emp.empRemainingLeaves - 1
              };
            }
            return emp;
          });
          setEmployees(updatedEmployees);
          alert('Employee marked as absent successfully!');
        } else {
          console.error('Failed to update employee data');
        }
      } catch (error) {
        console.error('Error marking employee as absent:', error);
      }
    }
  };

  const handlePresent = () => {
    if (window.confirm('Are you sure you want to mark this employee as present?')) {
      alert('Successfully marked as present!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ display: 'flex', backgroundColor: '#D8D1D1', minHeight: '100vh', padding: '20px' }}>
      <SideBar />
      <div className="container" style={{ padding: '20px', marginLeft: '250px', flexGrow: 1 }}>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <h1>Employee Attendance</h1>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>Employee ID</th>
                  <th style={{ textAlign: 'center' }}>Name</th>
                  <th style={{ textAlign: 'center' }}>Role</th>
                  <th style={{ textAlign: 'center' }}>Remaining Leaves</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td style={{ textAlign: 'center' }}>{employee.empID}</td>
                    <td style={{ textAlign: 'center' }}>{employee.empName}</td>
                    <td style={{ textAlign: 'center' }}>{employee.empRole}</td>
                    <td style={{ textAlign: 'center' }}>{employee.empRemainingLeaves}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        className="btn btn-outline-success me-2"
                        onClick={handlePresent}
                      >
                        Present
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleAbsent(employee._id)}
                      >
                        Absent
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emp_Attendance;
