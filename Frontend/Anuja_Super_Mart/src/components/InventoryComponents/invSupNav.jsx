// InvSupNav.js

import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../../components/logout';
import '../../styles/InvSupNav.scss' // Import the custom styles

const InvSupNav = () => {
    return (
        <div className="inv-sup-nav-container">
            <div className="container">
                <div className="row">
                    <div className="col-sm inv-sup-nav-link-container">
                        <Link to="/inventory" className="inv-sup-nav-link">
                            Inventory
                        </Link>
                        <Link to="/supplier" className="inv-sup-nav-link">
                            Supplier
                        </Link>
                    </div>
                    <div className="col-sm text-end">
                        <LogoutButton className="inv-sup-logout-button" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvSupNav;
