import React from 'react';
import logo from '../../assets/Accountant/logo.png';
import user from '../../assets/inventory/icons8-user-50.png';
import edit from '../../assets/inventory/icons8-edit-50.png';
import deleteicon from '../../assets/inventory/icons8-delete-24.png';
import inventoryicon from '../../assets/inventory/icons8-inventory-50.png';
import changeicon from '../../assets/inventory/icons8-change-50.png';
import { Link } from 'react-router-dom';

import './invsidebar.scss';

const Sidebar = () => {
    return (
        <div className="invSidebar">
            <div className="position-fixed top-0 start-0 bottom-0 sidebar">
                <div className="text-center p-3">
                    <img src={logo} alt="Logo" className="img-fluid mb-3" />
                </div>

                <Link to="/invprofile" className="text-decoration-none"> {/* Added text-decoration-none class here */}
                    <div className="sidebar-item text-center py-1">
                        <img src={user} alt="Icon 1" className="img-fluid d-inline-block invIcon" />
                        <span className="d-inline-block invText">User Profile</span>
                    </div>
                </Link>

                <Link to="/inventory" className="text-decoration-none"> {/* Added text-decoration-none class here */}
                    <div className="sidebar-item text-center py-1">
                        <img src={inventoryicon} alt="Icon 2" className="img-fluid d-inline-block invIcon" />
                        <span className="d-inline-block invText">Inventory</span>
                    </div>
                </Link>

                <Link to='/inventory/add' className="text-decoration-none"> {/* Added text-decoration-none class here */}
                    <div className="sidebar-item text-center py-1">
                        <img src={edit} alt="Icon 3" className="img-fluid d-inline-block invIcon" />
                        <span className="d-inline-block invText">Add Products</span>
                    </div>
                </Link>

                <Link to="/inventory/edit" className="text-decoration-none"> {/* Added text-decoration-none class here */}
                    <div className="sidebar-item text-center py-1">
                        <img src={changeicon} alt="Icon 4" className="img-fluid d-inline-block invIcon" />
                        <span className="d-inline-block invText">Change Details</span>
                    </div>
                </Link>

                <Link to="/inventory/delete" className="text-decoration-none"> {/* Added text-decoration-none class here */}
                    <div className="sidebar-item text-center py-1">
                        <img src={deleteicon} alt="Icon 4" className="img-fluid d-inline-block invIcon" />
                        <span className="d-inline-block invText">Delete Products</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
