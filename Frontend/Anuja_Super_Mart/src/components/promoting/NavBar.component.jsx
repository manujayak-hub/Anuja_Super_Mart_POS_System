import React from "react";
import {  Dropdown,  Row, Col } from "antd";
import { Link } from "react-router-dom";



export default function NavBar(){

    const items = [
       
      ];
    
    //   const adminItems = [
    //     {
    //       key: "1",
    //       label: <a href="/">Home</a>,
    //     },
    //     {
    //       key: "2",
    //       label: <a href="/allbookings">All Bookings</a>,
    //     },
    //     {
    //       key: "3",
    //       label: (
    //         <li
    //           onClick={() => {
    //             localStorage.removeItem("user");
    //             window.location.href = "/login";
    //           }}
    //         >
    //           Logout
    //         </li>
    //       ),
    //     },
    //   ];

    /*dgdgg*/

    return(
        <>
        <div className="header bs1" style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        backgroundColor:"#198754"
        }}>
        <Row  justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <b>
                  <Link
                    to="/"
                    style={{
                      color: "white",
                      letterSpacing: "1.5px",
                      fontSize: "30px",
                      fontFamily: "serif",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                      textDecoration: "none",
                    }}
                  >      
                    <img
                      //src="https://res.cloudinary.com/desnqqj6a/image/upload/v1683886702/Daco_4348109_rszw3f.png"
                      src="https://res.cloudinary.com/dljyf8xev/image/upload/v1710944952/car_images/logo_ahq5pi.png"
                      
                      alt="logo"
                      style={{
                        width: "100px",
                        height: "100%",
                        marginRight: "10px",
                        textDecoration: "none",
                      }}
                    />
                    Discount Management
                  </Link>
                </b>
              </h1>

              <Dropdown
                menu={{
                  items
                }}
                placement="bottom"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",

                    cursor: "pointer",
                  }}
                >
                 
                </div>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
        </>
    )
}