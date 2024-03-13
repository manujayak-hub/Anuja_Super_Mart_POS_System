import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/authStore';
import axios from '../api/axios';
import Nav from '../components/Nav'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const setUser = useStore(state => state.setUser);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', { email, password });
            console.log('Response:', res.data);
            setUser(res.data.token);
            setSuccessMessage('Login successful'); // Set success message
            setErrorMessage(''); // Clear error message
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Login failed. Please check your credentials.'); // Set error message
            setSuccessMessage(''); // Clear success message
        }
    }

    return (
        <>
            <Nav />
            <div>
                <h2>Login</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
