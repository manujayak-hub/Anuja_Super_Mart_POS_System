import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import { Input, Button } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import DeleteButtonFeed from "../../components/Analytics_components/DeleteButtonFeed";
import NavBar from "../../components/Analytics_components/NavBar.component";
import { Footer } from "antd/es/layout/layout";

export default function AdminFeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getFeedbacks() {
      axios.get("http://localhost:8000/feedback").then((res) => {
        setFeedbacks(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getFeedbacks();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/feedback/${id}`)
      .then(res => {
        // Update tags list after deletion
        setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
      })
      .catch(err => {
        console.error(err);
        alert('Error deleting Feedback.');
      });
  };

  const filteredFeedbacks = feedbacks.filter((feedback) =>
  feedback.username.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
    <NavBar/>

<Row style={{ minHeight: "calc(100vh - 64px - 70px)" }}> {/* 64px for NavBar, 70px for Footers */}
    <Col span={4} style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", backgroundColor: "#f0f0f0", padding: "20px" }}>
        
    <div style={{paddingTop:"20vh"}}>
        <a href="/analytics" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold"}}>Sales Analytics</a>
        <br/><hr/>
        <a href="/adminreport" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold"}}>Report</a>
        <br/><hr/>
        <a href="/adminfeedback" style={{ textDecoration: "none", color: "#FD204F", fontWeight: "bold"}}>Feedback</a>
        <hr/>
    </div>
    

    </Col>
    <Col span={18} style={{ margin: "20px auto", textAlign: "center" }}>              {/* s function */}
      <Input
        placeholder="Search by Username"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px", marginLeft: "400px", marginTop: "10px" }}
      />
      <h1>Customer Feedbacks</h1>
      <table className="table table-success table-striped">
        <thead>
          <tr className="table-dark">
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Comment</th>
            <th scope="col">Reaction</th>
            
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No feedbacks found.</td>
            </tr>
          ) : (
            filteredFeedbacks.map(feedback => (
              <tr key={feedback._id}>
                <td>{feedback.username}</td>
                <td>{feedback.email}</td>
                <td>{feedback.comment}</td>
                <td>{feedback.reaction}</td>
                
                <td><DeleteButtonFeed id={feedback._id} onDelete={() => handleDelete(feedback._id)} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h1>Admin Analysis</h1>
      <table className="table table-success table-striped">
        <thead>
          <tr className="table-dark">
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Analyst View</th>
            <th scope="col">Category</th>
            <th scope="col">Priority Number</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No feedbacks found.</td>
            </tr>
          ) : (
            filteredFeedbacks.map(feedback => (
              <tr key={feedback._id}>
                <td>{feedback.username}</td>
                <td>{feedback.email}</td>
                <td>{feedback.view}</td>
                <td>{feedback.category}</td>
                <td>{feedback.priority}</td>
                <td><Link to={"edit/"+feedback._id}><Button type="button" className="btn btn-danger" style={{ backgroundColor: 'green', border: 'none', width: '100px' }} >Edit</Button></Link></td>
                <td><DeleteButtonFeed id={feedback._id} onDelete={() => handleDelete(feedback._id)} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </Col>
      </Row>
      <Footer/>
    </>
  );
}
