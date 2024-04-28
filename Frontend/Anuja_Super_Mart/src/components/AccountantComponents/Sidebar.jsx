import React from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Sidebar.css';

const Sidebar = ({ handleDownloadPDF }) => {
  return (
    <Nav className="flex-column position-fixed top-0 start-0 bottom-0 sidebar">
      <div className="text-center p-3">
        <img src="src/assets/Accountant/logo.png" alt="Logo" className="img-fluid mb-3" />
      </div>
     
     
      <Nav.Item className="sidebar-item text-center py-3">
        <Nav.Link href="/transactions">
          <img src="src/assets/Accountant/Receipt Approved.png" alt="Icon 2" className="img-fluid d-inline-block icon" />
          <span className="d-inline-block text"> Dashboard</span>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className="sidebar-item text-center py-3">
        <Nav.Link href="/TransactionForm">
          <img src="src/assets/Accountant/newTrans.png" alt="Icon 1" className="img-fluid d-inline-block icon" />
          <span className="d-inline-block text">Add Transaction</span>
        </Nav.Link>
      </Nav.Item>
    
      <Nav.Item className="sidebar-item text-center py-3">
        <Nav.Link href="/AccountantDash">
          <img src="src/assets/Accountant/Sales Performance.png" alt="Icon 3" className="img-fluid d-inline-block icon" />
          <span className="d-inline-block text">Fetch Totals</span>
        </Nav.Link>
      </Nav.Item>  

      <Nav.Item className="sidebar-item text-center py-3">
        <Nav.Link href="/UserProfile">
          <img src="src/assets/Accountant/User Male.png" alt="Icon 1" className="img-fluid d-inline-block icon" />
          <span className="d-inline-block text">User Profile</span>
        </Nav.Link>
      </Nav.Item>
      
       

      {/* <Nav.Item className="sidebar-item text-center py-3">  
        <Nav.Link onClick={handleDownloadPDF}>
          <img src="src/assets/Accountant/Bill.png" alt="Icon 4" className="img-fluid d-inline-block icon" />
          <span className="d-inline-block text">Report pdf</span>
        </Nav.Link>
      </Nav.Item> */}
    </Nav>
  );
};

export default Sidebar;
