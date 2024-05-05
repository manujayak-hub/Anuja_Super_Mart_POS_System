import React, { useState } from 'react';
import Navbar from '../components/Nav';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    comment: '',
    reaction: '',
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    try {
      const response = await axios.post('http://localhost:8000/feedback/', formData);
      console.log(response.data); // Assuming the API returns a success message
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: '700px' }}>
                  <h1 className="text-successfu">Get in touch</h1>
                  <p className="mb-4">
                    The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes.
                    Just copy and paste the files, add a little code and you're done.{' '}
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name.
                    </Form.Control.Feedback>
                  </Form.Group>


                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicMessage">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Enter your message" name="comment" value={formData.comment} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">
                      Please enter your message.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicReaction">
                    <Form.Label>Reaction</Form.Label>
                    <Form.Control as="select" name="reaction" value={formData.reaction} onChange={handleChange}>
                      <option>Choose...</option>
                      <option>Bad</option>
                      <option>Not bad</option>
                      <option>Good</option>
                      <option>Excellent</option>
                    </Form.Control>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white" style={{ color: '#198754' }}>
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">"Anuja Super Mart", Nattandiya Road, Marawila</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white" style={{ color: '#198754' }}>
                  <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">AnujaSuper@gmail.com</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white" style={{ color: '#198754' }}>
                  <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">032 225 3234</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

    
      <div className="container-fluid footer py-5 mt-5" style={{ backgroundColor: "#198754" }}>
        <div className="container text-white">
        <h3 className="mb-3">Anuja Super Mart</h3>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="mb-3">Why People Like us!</h4>
                <p className="mb-4">
                  Anuja Supe Mart: Trusted for over a decade in Marawila, Sri Lanka. We're loved for quality, service, and a friendly smile!
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="mb-3">Shop Info</h4>
                <a className="btn-link" href="#">
                  About Us
                </a>
                <a className="btn-link" href="#">
                  Contact Us
                </a>
                <a className="btn-link" href="#">
                  Privacy Policy
                </a>
                <a className="btn-link" href="#">
                  Terms & Condition
                </a>
                <a className="btn-link" href="#">
                  Return Policy
                </a>
                <a className="btn-link" href="#">
                  FAQs & Help
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="mb-3">Account</h4>
                <a className="btn-link" href="#">
                  My Account
                </a>
                <a className="btn-link" href="#">
                  Shop details
                </a>
                <a className="btn-link" href="#">
                  Shopping Cart
                </a>
                <a className="btn-link" href="#">
                  Wishlist
                </a>
                <a className="btn-link" href="#">
                  Order History
                </a>
                <a className="btn-link" href="#">
                  International Orders
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="mb-3">Contact</h4>
                <p>Address: "Anuja Super Mart", Nattandiya Road, Marawila</p>
                <p>Email: AnujaSuper@gmail.com</p>
                <p>Phone: 032 225 3234</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
