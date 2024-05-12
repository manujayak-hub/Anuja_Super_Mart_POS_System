import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from '../../components/AccountantComponents/Sidebar';
import userProfileImage from '../../assets/Accountant/User Male.png'; 

const UserProfile = () => {
   
    const userProfile = {
        name: "Udari Devindi",
        email: "udaridevindi@gmail.com",
        
    };

    const handleLogout = () => {
        // Redirect to the logout page
        window.location.href = 'http://localhost:5173';
    };

    return (
        <div style={{ backgroundColor: 'lightgray', minHeight: '100vh', paddingTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container style={{ borderRadius: '10px' }}>
                <Row>
                    <Col md={3} className="text-center">
                        <Sidebar />
                    </Col>
                    <Col md={8} className="text-center"> 
                        <div style={{ border: '1px solid #ccc', padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px' }}>
                            <div className="text-center mt-3">
                                <img src={userProfileImage} alt="User Avatar" style={{ maxWidth: '100%', borderRadius: '50%' }} />
                            </div>
                            <div>
                                <div className="text-danger" style={{ textAlign: 'center', paddingLeft: '20px', fontSize: '2rem', fontWeight: 'bold' }}>User Profile</div>
                                <p>Name: {userProfile.name}</p>
                                <p>Email: {userProfile.email}</p>
                                <Button variant="danger" onClick={handleLogout}>Logout</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UserProfile;
