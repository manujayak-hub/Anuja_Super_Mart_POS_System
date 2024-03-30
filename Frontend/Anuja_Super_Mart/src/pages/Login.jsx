import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useStore } from '../stores/authStore';
import axios from '../api/axios';
import Nav from '../components/Nav';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const setUser = useStore(state => state.setUser);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', { email, password });
            setUser(res.data.token);
            setErrorMessage('');
            // Redirect based on user email
            if (email === 'manujayak8@gmail.com') {
                navigate('/inventory'); // Navigate to /inventory for manujayak8@gmail.com
            } else if (email === 'n@gmail.com') {
                navigate('/cashier'); // Navigate to /cashier for n@gmail.com
            } else {
                navigate('/'); // Navigate to home for other users
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Login failed. Please check your credentials.');
        }
    }

    return (
        <>
            <Nav />
            <div>
                <h2>Login</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
                <Link to="/signup">Don't have an account? Sign Up</Link>
            </div>
        </>
    );
}

export default Login;
