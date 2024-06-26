import React from 'react';

const LogoutButton = () => {
    const handleLogout = () => {
        // Clear session on logout
        sessionStorage.removeItem('user');
        // Redirect to home page
        window.location.href = '/';
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    );
};

export default LogoutButton;
