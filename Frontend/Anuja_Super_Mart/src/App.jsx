<<<<<<< Updated upstream
import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>hi</h1>
    </>
  )
=======
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import { useStore } from './stores/auth_store';
import Signup from './pages/Signup';

function App() {
  const user = useStore(state => state.user);

  const emailRedirectMap = {
    'mahinda@gmail.com': '/About',
    'dog@dog.lk': '/contact',
    'bird@bird.lk': '/profile'
    // Add more mappings as needed
  };

  // Function to determine if redirection is needed based on the user's email
  const shouldRedirect = () => {
    const userEmail = user?.email; // Get the user's email address (if user is logged in)
    const redirectPath = emailRedirectMap[userEmail]; // Get the corresponding redirect path based on the user's email

    // Check if the current URL is not the same as the redirect path and the user's email exists in the mapping
    return redirectPath && window.location.pathname !== redirectPath;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        {/* Redirect the user to the appropriate page based on their email */}
        {shouldRedirect() && <Navigate to={emailRedirectMap[user?.email]} />}
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
>>>>>>> Stashed changes
}

export default App;
