import React from 'react';

const Sidebar = () => {
    return (

        <>
            <div className="position-fixed top-0 start-0 bottom-0 sidebar">
                <div className="text-center p-3">
                    <img src="src/assets/Accountant/logo.png" alt="Logo" className="img-fluid mb-3" />
                </div>
                <div className="sidebar-item text-center py-3">
                    <img src="src/assets/Accountant/User Male.png" alt="Icon 1" className="img-fluid d-inline-block icon" />
                    <span className="d-inline-block text">User Profile</span>
                </div>
                <div className="sidebar-item text-center py-3">
                    <img src="src/assets/Accountant/Receipt Approved.png" alt="Icon 2" className="img-fluid d-inline-block icon" />
                    <span className="d-inline-block text">Transactions</span>
                </div>
                <div className="sidebar-item text-center py-3">
                    <img src="src/assets/Accountant/Sales Performance.png" alt="Icon 3" className="img-fluid d-inline-block icon" />
                    <span className="d-inline-block text">Revenue</span>
                </div>
                <div className="sidebar-item text-center py-3">
                    <img src="src/assets/Accountant/Bill.png" alt="Icon 4" className="img-fluid d-inline-block icon" />
                    <span className="d-inline-block text">Reports</span>
                </div>
            </div>



        </>

    );
};

export default Sidebar;
