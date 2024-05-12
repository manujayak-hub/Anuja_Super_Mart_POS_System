import React, { useEffect, useState } from 'react';

function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const response = await fetch('/auth/details', {
                    method: 'GET',
                    credentials: 'include' // Include cookies for session
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error(error);
                // Handle errors, e.g., redirect to login page
            }
        }

        fetchUserDetails();
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    return (
        <div>
            {user ? (
                <div>
                    <h2>User Profile</h2>
                    <p>ID: {user._id}</p>
                    <p>Email: {user.email}</p>
                    <p>Name: {user.fname} {user.lname}</p>
                    <p>Mobile: {user.mobile}</p>
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
}

export default UserProfile;
