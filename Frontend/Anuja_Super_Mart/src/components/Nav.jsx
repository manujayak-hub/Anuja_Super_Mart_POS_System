import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/Accountant/logo.png'; // Import your logo image file

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#198754' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logoImage} alt="Anuja Super Mart Logo" className="me-2" style={{ height: '30px', width: 'auto' }} />
            Anuja Super Mart
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">Categories</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
