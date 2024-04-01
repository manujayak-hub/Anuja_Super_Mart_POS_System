import React from 'react';
import logo from '../../assets/Accountant/logo.png';
import user from '../../assets/inventory/icons8-user-50.png';
import edit from '../../assets/inventory/icons8-edit-50.png';
import inventoryicon from '../../assets/inventory/icons8-inventory-50.png';
import { Link } from 'react-router-dom';

import './invsidebar.scss';

const InvSupSidebar = () => {
    return ( 
        <div className="invSidebar">
            <div className="position-fixed top-0 start-0 bottom-0 sidebar">
                <div className="text-center p-3">
                    <img src={logo} alt="Logo" className="img-fluid mb-3" />
                </div>

                <Link to="/invprofile" className="text-decoration-none"> 
                    <div className="sidebar-item text-center py-1">
                        <img src={user} alt="Icon 1" className="img-fluid d-inline-block invIcon" />
                        <span className="d-inline-block invText">User Profile</span>
                    </div>
                </Link>

                <Link to="/supplier" className="text-decoration-none"> 
                    <div className="sidebar-item text-center py-1">
                        <img src={inventoryicon} alt="Icon 2" className="img-fluid d-inline-block invIcon" />
                        <span className="d-inline-block invText">Supplier Details</span>
                    </div>
                </Link>

                <Link to='/supplier/add' className="text-decoration-none"> 
                    <div className="sidebar-item text-center py-1">
                        <img src={edit} alt="Icon 3" className="img-fluid d-inline-block invIcon" />
                        <span className="d-inline-block invText">Add Supplier</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default InvSupSidebar;
