import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/authStore';
import axios from '../api/axios';
import Nav from '../components/Nav';
import './Signup.scss'; // Import the SCSS file

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

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Invalid email format. Please enter a valid email address.');
      return;
    }

    // Phone number validation
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(mobile)) {
      setErrorMessage('Invalid phone number format. Please enter a 10-digit mobile number.');
      return;
    }

    try {
      const res = await axios.post('/auth/signup', { fname, lname, mobile, email, password });
      setUser(res.data.token);
      setSuccessMessage('Signup successful');
      setErrorMessage('');
      console.log(res.data);
    } catch (error) {
      setErrorMessage('Signup failed. Please try again.');
      setSuccessMessage('');
      console.error(error.response.data);
    }
  };

  return (
    <>
      <Nav />
      <div className="container signup-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-4">Signup</h2>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="First Name" value={fname} onChange={(e) => setfname(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Last Name" value={lname} onChange={(e) => setlname(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <input type="tel" className="form-control" placeholder="Mobile" value={mobile} onChange={(e) => setmobile(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <center>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                  </center>
                </form>
                <div className="mt-3">
                  <Link to="/login">Already have an account? Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
