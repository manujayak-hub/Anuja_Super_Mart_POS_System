import React, { useState } from 'react';
import Navbar from '../components/Nav';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
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
                  <h1 className="text-primary">Get in touch</h1>
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
                    <Form.Control type="text" placeholder="Enter your name" required />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Enter your message" required />
                    <Form.Control.Feedback type="invalid">
                      Please enter your message.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">"Anuja Super Mart", Nattandiya Road, Marawila</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">AnujaSuper@gmail.com</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
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

    
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
      <div className="container py-5">
        <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
          <div className="row g-4">
            <div className="col-lg-3">
              <a href="#">
                <h1 className="text-primary mb-0">Anuja Super Mart</h1>
                <p className="text-secondary mb-0">Best products</p>
              </a>
            </div>
            <div className="col-lg-6">
              <div className="position-relative mx-auto">
                <input
                  className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                  type="number"
                  placeholder="Your Email"
                />
                <button
                  type="submit"
                  className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                  style={{ top: 0, right: 0 }}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Why People Like us!</h4>
              <p className="mb-4">
              Anuja Supe Mart: Trusted for over a decade in Marawila, Sri Lanka. We're loved for quality, service, and a friendly smile!
              </p>
              <a href="#" className="btn border-secondary py-2 px-4 rounded-pill text-primary">
                Read More
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="d-flex flex-column text-start footer-item">
              <h4 className="text-light mb-3">Shop Info</h4>
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
              <h4 className="text-light mb-3">Account</h4>
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
              <h4 className="text-light mb-3">Contact</h4>
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
