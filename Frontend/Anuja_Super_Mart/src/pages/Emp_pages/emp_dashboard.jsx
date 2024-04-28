// Emp_Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const Emp_Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [currentEmployees, setCurrentEmployees] = useState(0);
  const [absentEmployees, setAbsentEmployees] = useState(0);
  const [resignedEmployees, setResignedEmployees] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('/emp');
        const employees = response.data;
        setTotalEmployees(employees.length);
        setCurrentEmployees(employees.filter(emp => emp.status === 'working').length);
        setAbsentEmployees(employees.filter(emp => emp.status === 'absent').length);
        setResignedEmployees(employees.filter(emp => emp.status === 'resigned').length);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Employee Dashboard</h1>
      <div>Total Employees: {totalEmployees}</div>
      <div>Currently Working: {currentEmployees}</div>
      <div>Absent Employees: {absentEmployees}</div>
      <div>Resigned Employees: {resignedEmployees}</div>
    </div>
  );
};

export default Emp_Dashboard;
