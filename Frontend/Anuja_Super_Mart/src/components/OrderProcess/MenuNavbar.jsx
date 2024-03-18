import React from "react";
import { Link } from 'react-router-dom';
import './MenuNavbar.scss';

const MenuNav = () => {
    return ( <>
    
    <div class="navbar">
    <nav>
        <ul>
          <li><Link to="/">Menu</Link></li>
          <li><Link to="/List">List</Link></li>
          <li><Link to="/">Add Customer</Link></li>
          <li><Link to="/">Pickup Orders</Link></li>
          <li><Link to="/">Order Retrival</Link></li>

        </ul>
      </nav>
</div>
    
    
    </> );
}
 
export default MenuNav;