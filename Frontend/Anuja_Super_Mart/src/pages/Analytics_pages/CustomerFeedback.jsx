import "./styles.css";
import { Row, Col } from "antd";
import Footers from "../../components/Analytics_components/Footer.component";
import NavBar from "../../components/Analytics_components/NavBar.component";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerFeedback() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [reaction, setReaction] = useState("");


  function sendData(e) {
    e.preventDefault();

    const newFeed = {
      username,
      email,
      comment,
      reaction
    }

    axios.post("http://localhost:8000/feedback/", newFeed).then(() => {
      alert("New Feedback Added to the system")
      // window.location.href='/admin/tags';

    }).catch((err) => {
      alert(err)
    })
  }

  return (
    <>
      <NavBar />

      <Row style={{ minHeight: "calc(100vh - 64px - 70px)" }}> {/* 64px for NavBar, 70px for Footers */}
        
        <Col span={24}>
          <section className="vh-100 bg-image" style={{ backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")' }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card" style={{ borderRadius: 15 }}>
                      <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-5">Add Feedback</h2>
                        <form onSubmit={sendData} >
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example1cg">Username</label>
                            <input type="text" id="username" className="form-control form-control-lg" required onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example3cg">Email</label>
                            <input type="email" id="email" className="form-control form-control-lg" required onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example4cg">Comments</label>
                            <input type="text" id="comment" className="form-control form-control-lg" required onChange={(e) => {
                              setComment(e.target.value);
                            }}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example4cg">Reaction</label>
                            <select id="reaction" className="form-select" required onChange={(e) => {
                              setReaction(e.target.value);
                            }}>
                              <option selected>Choose...</option>
                              <option>Bad</option>
                              <option>Not Bad</option>
                              <option>Good</option>
                              <option>Excellent</option>
                            </select>
                          
                          </div>

                          <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" >Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Col>
      </Row>

      <Footers />

    </>
  )
}
