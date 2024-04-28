import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SideBar from '../../components/EmployeeComponents/empSideBar';

const Emp_Salary = () => {
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

  const calculateFinalSalary = (basicSalary, otHours, bonuses) => {
    return basicSalary + (1000 * otHours) + bonuses;
  };

  const handleUpdateSalary = async (id, otHours, bonuses) => {
    try {
      const response = await axios.patch(`/emp/${id}`, { otHours, bonuses });
      if (response.status === 200) {
        const updatedEmployees = employees.map(emp => {
          if (emp._id === id) {
            const finalSalary = calculateFinalSalary(emp.empBasicSalary, otHours, bonuses);
            return {
              ...emp,
              empOTHours: otHours,
              empBonuses: bonuses,
              empFinalSalary: finalSalary
            };
          }
          return emp;
        });
        setEmployees(updatedEmployees);
      } else {
        console.error('Failed to update salary');
      }
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

  const handleSaveToDatabase = async () => {
    try {
      // Update the database for each employee
      for (const employee of employees) {
        const finalSalary = calculateFinalSalary(employee.empBasicSalary, employee.empOTHours, employee.empBonuses);
        await axios.patch(`/emp/${employee._id}`, { empFinalSalary: finalSalary });
      }
      alert('Final salaries updated successfully!');
    } catch (error) {
      console.error('Error saving final salaries to database:', error);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Salary Report', 10, 10);
    doc.autoTable({
      head: [['Employee ID', 'Name', 'Basic Salary', 'OT Hours', 'Bonuses', 'Final Salary']],
      body: employees.map(emp => [
        emp.empID,
        emp.empName,
        emp.empBasicSalary,
        emp.empOTHours || '',
        emp.empBonuses || '',
        calculateFinalSalary(emp.empBasicSalary, emp.empOTHours, emp.empBonuses)
      ])
    });
    doc.save('salary_report.pdf');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid" style={{ backgroundColor: '#D8D1D1', minHeight: '100vh', padding: '20px' }}>
      <div className="row">
        <div className="col-md-2">
          <SideBar />
        </div>
        <div className="col-md-10">
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px', margin: '0px 5px' }}>
            <h1>Employee Salary</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Basic Salary</th>
                  <th>OT Hours</th>
                  <th>Bonuses</th>
                  <th>Final Salary</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.empID}</td>
                    <td>{employee.empName}</td>
                    <td>{employee.empBasicSalary}</td>
                    <td>
                      <input
                        type="number"
                        value={employee.empOTHours || ''}
                        onChange={(e) => {
                          const otHours = parseInt(e.target.value);
                          setEmployees(prevState => {
                            return prevState.map(emp => {
                              if (emp._id === employee._id) {
                                return { ...emp, empOTHours: otHours };
                              }
                              return emp;
                            });
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={employee.empBonuses || ''}
                        onChange={(e) => {
                          const bonuses = parseInt(e.target.value);
                          setEmployees(prevState => {
                            return prevState.map(emp => {
                              if (emp._id === employee._id) {
                                return { ...emp, empBonuses: bonuses };
                              }
                              return emp;
                            });
                          });
                        }}
                      />
                    </td>
                    <td>{calculateFinalSalary(employee.empBasicSalary, employee.empOTHours, employee.empBonuses)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto mt-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSaveToDatabase}
              style={{ backgroundColor: '#FD204F', border: 'none', outline: 'none', transition: 'background-color 0.3s' }}
              onMouseOver={(e) => { e.target.style.backgroundColor = '#ff3377'; }}
              onMouseOut={(e) => { e.target.style.backgroundColor = '#FD204F'; }}
            >
              Save to Database
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleDownloadPDF}
              style={{ backgroundColor: '#FD204F', border: 'none', outline: 'none', transition: 'background-color 0.3s' }}
              onMouseOver={(e) => { e.target.style.backgroundColor = '#ff3377'; }}
              onMouseOut={(e) => { e.target.style.backgroundColor = '#FD204F'; }}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emp_Salary;
