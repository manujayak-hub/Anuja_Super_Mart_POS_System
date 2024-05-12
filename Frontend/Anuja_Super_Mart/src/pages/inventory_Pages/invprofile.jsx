import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/InventoryComponents/InvSideBar';
import InvSupNav from '../../components/InventoryComponents/invSupNav';
import axios from 'axios';

const InvProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/ details');
            console.log('User details:', response.data); // Check the fetched user details
            setUser(response.data); // Set only the data part of the response
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    
    
    
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col-sm-2 sidenav">
                    <Sidebar />
                </div>
                <div className="col-sm-10">
                    <InvSupNav/>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvProfile;
