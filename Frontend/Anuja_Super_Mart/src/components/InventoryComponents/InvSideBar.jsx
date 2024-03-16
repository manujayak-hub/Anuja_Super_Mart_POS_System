import React from 'react';

const Sidebar = () => {
    return (
        <div className="invSidebar">
            <div className="position-fixed top-0 start-0 bottom-0 sidebar">
                <div className="text-center p-3">
                    <img src="src/assets/Accountant/logo.png" alt="Logo" className="img-fluid mb-3" />
                </div>
                <div className="sidebar-item text-center py-1">
                    <img src="src/assets/inventory/icons8-user-50.png" alt="Icon 1" className="img-fluid d-inline-block invIcon" />
                    <span className="d-inline-block invText">User Profile</span>
                </div>
                <div className="sidebar-item text-center py-1">
                    <img src="src/assets/inventory/icons8-inventory-50.png" alt="Icon 2" className="img-fluid d-inline-block invIcon" />
                    <span className="d-inline-block invText">Inventory</span>
                </div>
                <div className="sidebar-item text-center py-1">
                    <img src="src/assets/inventory/icons8-edit-50.png" alt="Icon 3" className="img-fluid d-inline-block invIcon" />
                    <span className="d-inline-block invText">Edit Products</span>
                </div>
                <div className="sidebar-item text-center py-1">
                    <img src="src/assets/inventory/icons8-delete-24.png" alt="Icon 4" className="img-fluid d-inline-block invIcon" />
                    <span className="d-inline-block invText">Delete Products</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
