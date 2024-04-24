import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/authStore';
import axios from '../api/axios';
import Nav from '../components/Nav';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const setUser = useStore(state => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      await setUser(res.data.token); // Wait for setUser to complete
      setErrorMessage('');
      // Redirect based on user email
      if (email === 'manujayak8@gmail.com') {
        navigate('/inventory');
      } else if (email === 'n@gmail.com') {

        navigate('/cashier');
      } else if (email === 'dulanimalka1@gmail.com') {
        navigate('/emp_list');
      } else {
        navigate('/');

      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Login failed. Please check your credentials.');
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
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
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
