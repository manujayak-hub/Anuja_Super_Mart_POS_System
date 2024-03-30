import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router

const InvSupNav = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <Link to="/inventory" className="nav-link text-decoration-none border-0">
                        <span className="text-decoration-none text-dark">Inventory</span>
                    </Link>
                </div>
                <div className="col-sm">
                    <Link to="/supplier" className="nav-link text-decoration-none border-0">
                        <span className="text-decoration-none text-dark">Supplier</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default InvSupNav;
