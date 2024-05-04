// MenuHeader.js

import React from "react";
import { Link } from 'react-router-dom';
import './MenuHeader.scss'; // Import SCSS file

const MenuHeader = () => {
    return ( 
        <div className="menu-header-container">
            <h1 className="menu-header-heading">
                MENU
            </h1>
        </div>
     );
}
 
export default MenuHeader;
