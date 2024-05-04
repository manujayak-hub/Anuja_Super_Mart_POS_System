import React from "react";
import { Link } from 'react-router-dom';
import './MenuNavbar.scss';
import logo from '../../assets/Order/logo.png'

const MenuNav = () => {
    return ( <>
    
    <div class="sidebarorder">
      <div className="logoicaon">
      <img src={logo} alt="logo" style={{ width: "100px", height: "100px", marginLeft:"40px"}} />


      </div>
    <nav>
        <ul>
          <li><Link to="/Menu">Menu</Link></li>
          <li><Link to="/List">List</Link></li>
          <li><Link to="/PickupOrders">Pickup Orders</Link></li>
          <li><Link to="/OrderRetrieve">Order Retrival</Link></li>

        </ul>
      </nav>
</div>
    
    
    </> );
}
 
export default MenuNav;