import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout'); // Assuming your logout route is /auth/logout
      window.location.reload(); // Reload the page to reflect logged-out state
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
