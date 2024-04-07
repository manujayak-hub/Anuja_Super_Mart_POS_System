import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Emp_list from '../pages/Emp_pages/emp_list'
import Emp_Dashboard from '../pages/Emp_pages/emp_dashboard'
import Emp_Attendance from '../pages/Emp_pages/emp_attendance'
import Emp_Salary from '../pages/Emp_pages/emp_salary'

const EmpRoute = () => {
    return (
        <BrowserRouter>
          <Routes>

          <Route path="emp_list" element={<Emp_list/>} />
            <Route path="emp_dashboard" element={<Emp_Dashboard/>} />
            <Route path="emp_attendance" element={<Emp_Attendance/>} />
            <Route path="emp_salary" element={<Emp_Salary/>} />

          </Routes>
    </BrowserRouter>
  );

};
export default EmpRoute;
