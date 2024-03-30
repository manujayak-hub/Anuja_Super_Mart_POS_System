import React from 'react';
import Sidebar from '../../components/InventoryComponents/InvSideBar';
import LogoutButton from '../../components/logout';

const InvProfile = () => {
    // Assume user details are passed as props or retrieved from the session
    const user = {
        fname: 'manujaya',
        lname: 'manujaya',
        email: 'manujaya@example.com',
        mobile: '1234567890'
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col-sm-2 sidenav">
                    <Sidebar />
                </div>
                <div className="col-sm-10">
                    <div className="row-sm-2">
                    <div className="card p-8">
                        <div className="card-body">
                            <h3 className="card-title text-center">Profile Information</h3>
                            <hr />
                            <div className="row">
                                <div className="col-sm-6">
                                    <p><strong>First Name:</strong> {user.fname}</p>
                                    <p><strong>Last Name:</strong> {user.lname}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Mobile No:</strong> {user.mobile}</p>
                                </div>
                            </div>
                            <LogoutButton />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvProfile;
