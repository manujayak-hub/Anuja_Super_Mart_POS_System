import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/authStore';
import axios from '../api/axios';
import Nav from '../components/Nav';
import './Signup.scss'; // Import the SCSS file

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const setUser = useStore(state => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let isValid = true;

    // First Name validation
    if (!fname.trim()) {
      setFnameError('First Name is required');
      isValid = false;
    } else {
      setFnameError('');
    }

    // Last Name validation
    if (!lname.trim()) {
      setLnameError('Last Name is required');
      isValid = false;
    } else {
      setLnameError('');
    }

    // Mobile validation
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(mobile)) {
      setMobileError('Invalid phone number format.');
      isValid = false;
    } else {
      setMobileError('');
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email format. Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) {
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
                    <input type="text" className="form-control" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)} required />
                    {fnameError && <p className="text-danger">{fnameError}</p>}
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} required />
                    {lnameError && <p className="text-danger">{lnameError}</p>}
                  </div>
                  <div className="mb-3">
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="Mobile" 
                      value={mobile} 
                      onChange={(e) => setMobile(e.target.value)} 
                      onKeyPress={(e) => {
                        // Allow only numbers and control keys like backspace
                        const pattern = /[0-9\b]/;
                        if (!pattern.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      required 
                    />
                    {mobileError && <p className="text-danger">{mobileError}</p>}
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {emailError && <p className="text-danger">{emailError}</p>}
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {passwordError && <p className="text-danger">{passwordError}</p>}
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
