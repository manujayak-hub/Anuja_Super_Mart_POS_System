import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const Profile = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col md={4}>
          <Image src="https://via.placeholder.com/150" roundedCircle />
        </Col>
        <Col md={8}>
          <h2>John Doe</h2>
          <p>Email: john.doe@example.com</p>
          <p>Location: New York, USA</p>
          <p>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget metus nec dolor volutpat tempor vel vel ex.</p>
          <Button variant="primary">Edit Profile</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
