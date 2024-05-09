import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import Footers from "../../components/Analytics_components/Footer.component";
import NavBar from "../../components/Analytics_components/NavBar.component";

export default function EditFeedback() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [view, setView] = useState("");
  const [comment, setComment] = useState("");
  const [reaction, setReaction] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const [error, setError] = useState();
  const params = useParams();

  const getSelectedFeedback = () => {
    axios.get(`http://localhost:8000/feedback/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setView(response.data.view);
        setCategory(response.data.category);
        setPriority(response.data.priority);
        setComment(response.data.comment);
        setReaction(response.data.reaction);
       
      })
    }

    useEffect(()=>{
      getSelectedFeedback();
    },[]);


    const updateFeedbackDetails = (e) => {
      e.preventDefault();
    
      let updatedData = {
        username: username,
        email: email,
        view: view,
        comment: comment,
        reaction: reaction,
        category: category,
        priority: priority,
      };
    
      axios
        .patch(`http://localhost:8000/feedback/${params.id}`, updatedData)
        .then(() => {
          alert("Feedback details updated");
          window.location.href = "/adminfeedbacklist";
        })
        .catch((error) => {
          setError(error.message || "An error occurred while updating feedback details.");
        });
    };
    



  return (
    <>
      <NavBar />

      <Row style={{ minHeight: "calc(100vh - 64px - 70px)" }}> {/* 64px for NavBar, 70px for Footers */}
        <Col span={4} style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", backgroundColor: "#f0f0f0", padding: "20px" }}>

          <div style={{ paddingTop: "20vh" }}>
            <a href="/" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold", }}>Sales Analytics</a>
            <br /><hr />
            <a href="/adminreport" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Report</a>
            <br /><hr />
            <a href="/adminfeedbacklist" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Feedback</a>
            <hr />
          </div>
        </Col>
        <Col span={18}>



          <Row justify="center" className="mt-5">
            <Col lg={18} sm={15}>

              <h3>Update Feedback Status</h3>
              <br /><br />
              <form className="bs1 p-2" onSubmit={updateFeedbackDetails} style={{
                display: "flex",
                borderRadius: "20px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0,0,0,1)",
              }}>
                <div style={{ flex: 1, padding: "35px", }}>
                  <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                      className="form-control"
                      id="username" onChange={(e) => setUsername(e.target.value)} value={username} readOnly />
                  </div>
                  <br />

                  <div className="form-group">
                    <label>Email: </label>
                    <input type="text"
                      className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} value={email} readOnly />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Email: </label>
                    <input type="text"
                      className="form-control" id="comment" onChange={(e) => setComment(e.target.value)} value={comment} readOnly />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Email: </label>
                    <input type="text"
                      className="form-control" id="reaction" onChange={(e) => setReaction(e.target.value)} value={reaction} readOnly />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>view: </label>
                    <input type="text"
                      className="form-control"
                      id="view" required value={view} onChange={(e) => setView(e.target.value)}

                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Category: </label>
                    <input type="text"
                      className="form-control"
                      id="category" required value={category} onChange={(e) => setCategory(e.target.value)}

                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Priority : </label>
                    <input
                      type="text"
                      className="form-control"
                      id="priority" required value={priority} onChange={(e) => setPriority(e.target.value)} />
                  </div>
                  <br />
                  {error && <div className="error">{error}</div>}
                  <br />

                  <div className="form-group">
                    <input type="submit" value="Set Feedback" className="btn btn-primary" style={{
                      borderRadius: "10px",
                      width: "50%",
                      height: "40px",
                      backgroundColor: "#FD204F",
                      border: "1px solid #FD204F", // Border color
                      boxShadow: "0 2px 4px rgba(0,0,0,0.5)" // Shadow
                    }} />
                  </div>
                </div>

                <div
                  //image
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="https://img.freepik.com/free-vector/computer-monitor-virtual-cloud-documents-with-information-isometric-vector-icons_107791-4547.jpg?t=st=1711778078~exp=1711781678~hmac=c7f19c9bd258c97d6f49ead4591b9c3862a3762750478f168340df396c47adaf&w=740"
                    style={{ width: "400px", height: "400px" }}
                  />
                </div>
              </form>
              <br />
            </Col>
          </Row>

        </Col>
      </Row>

      <Footers/>

    </>
  )
}
