import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router
import LogoutButton from '../../components/logout';

const InvSupNav = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <Link to="/inventory" className="nav-link text-decoration-none">
                            <span className="text-dark">Inventory</span>
                        </Link>
                    </div>
                    <div className="col-sm">
                        <Link to="/supplier" className="nav-link text-decoration-none">
                            <span className="text-dark">Supplier</span>
                        </Link>
                    </div>
                </div>
                <div className="col-sm text-end">
                    <LogoutButton />
                </div>
            </div>
            
            
        </>
        );
}

export default InvSupNav;
