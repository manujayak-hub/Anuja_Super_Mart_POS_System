import React from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './empSideBar.scss';
import LogoutButton from '../logout'

const empSidebar = () => {
  return (
    <Nav className="flex-column position-fixed top-0 start-0 bottom-0 sidebar">
      <div className="text-center p-3">
        <img src="src/assets/Accountant/logo.png" alt="Logo" className="img-fluid mb-3" />
      </div>
      <Nav.Item className="sidebar-item text-center py-3">
        <Nav.Link href="/emp_list">
          <img src="src/assets/Accountant/User Male.png" alt="Icon 1" className="img-fluid d-inline-block icon" />
          <span className="d-inline-block text">Employee List</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item text-center py-3">
        <Nav.Link href="/emp_attendance#">
          <img src="src/assets/Accountant/Receipt Approved.png" alt="Icon 2" className="img-fluid d-inline-block icon" />
          <span className="d-inline-block text">Attendance List</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="sidebar-item text-center py-3">
        <Nav.Link href="/emp_salary">
          <img src="src/assets/Accountant/Sales Performance.png" alt="Icon 3" className="img-fluid d-inline-block icon" />
          <span className="d-inline-block text">Payroll</span>
        </Nav.Link>
      </Nav.Item>
      <div style={{marginTop:'200px',marginLeft:'20px'}}>
        <LogoutButton/>
      </div>
      
    </Nav>
  );
};

export default empSidebar;