import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/authStore';
import axios from '../api/axios';
import Nav from '../components/Nav'

const Signup = () => {
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const setUser = useStore(state => state.setUser);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/signup', { fname, lname, mobile, email, password });
            setUser(res.data.token);
            setSuccessMessage('Signup successful'); // Set success message
            setErrorMessage(''); // Clear error message
            console.log(res.data); // Handle successful signup
        } catch (error) {
            setErrorMessage('Signup failed. Please try again.'); // Set error message
            setSuccessMessage(''); // Clear success message
            console.error(error.response.data); // Handle error
        }
    }

    return (
        <>
            <Nav />
            <div>
                <h2>Signup</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="first name" value={fname} onChange={(e) => setfname(e.target.value)} /><br/>
                    <input type="text" placeholder="last name" value={lname} onChange={(e) => setlname(e.target.value)} /><br/>
                    <input type="tel" placeholder="077589663" value={mobile} onChange={(e) => setmobile(e.target.value)} /><br/>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
                    <button type="submit">Sign Up</button>
                </form>
                <Link to="/login">Already have an account? Login</Link>
            </div>
        </>
    );
}

export default Signup;
