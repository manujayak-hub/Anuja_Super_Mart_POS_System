import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/authStore';
import axios from '../api/axios';
import Nav from '../components/Nav';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const setUser = useStore(state => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { // Check if email or password is empty or contains only whitespace
      setErrorMessage('Please enter both email and password.');
      setShowErrorModal(true);
      return;
    }
    try {
      const res = await axios.post('/auth/login', { email, password });
      await setUser(res.data.token);
      setErrorMessage('');
      // Redirect based on user email
      if (email === 'manujayak8@gmail.com') {

        navigate('/inventory'); // Navigate to /inventory for manujayak8@gmail.com

      } else if (email === 'udari@gmail.com') {
        navigate('/Transactions');  // Navigate to /cashier for n@gmail.com

      } else if (email === 'rmsahanpramudithabandara22@gmail.com') {
        navigate('/Menu'); // Navigate to /cashier for n@gmail.com

        

      } else if (email === 'dulanimalka1@gmail.com') {
        navigate('/emp_list');
 

      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Login failed. Please check your credentials.');
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <Nav />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  <center>
                    <button type="submit" className="btn btn-primary">Login</button>
                  </center>
                </form>
                <div className="mt-3">
                  <Link to="/signup">Don't have an account? Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
