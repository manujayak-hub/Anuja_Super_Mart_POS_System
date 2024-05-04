import React from "react";
import {  Dropdown,  Row, Col } from "antd";
import { Link } from "react-router-dom";



export default function NavBar(){

    const items = [
        {
          key: "1",
          label: <a href="/" style={{ textDecoration: "none" }}>Home</a>,
        },
        {
          key: "2",
          label: <a href="/viewdiscount" style={{ textDecoration: "none" }}>Customer Discounts List</a>,
        },
        {
            key: "3",
            label: <a href="/discountmanagerhome" style={{ textDecoration: "none" }}>Discount Manager Home</a>,
          },
          {
            key: "4",
            label: <a href="/registerdiscount" style={{ textDecoration: "none" }}>Create Discounts</a>,
          },
          {
            key: "5",
            label: <a href="/sendmail" style={{ textDecoration: "none" }}>Send Mail</a>,
          },
        {
          key: "6",
          label: (
            <li
              onClick={() => {
                //localStorage.removeItem("user");
                //window.location.href = "/login";
              }}
              style={{ textDecoration: "none" }}>
              Logout
            </li>
          ),
        },
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



    return(
        <>
        <div className="header bs1" style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        //backgroundColor:"#80787b"
        }}>
        <Row  justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <b>
                  <Link
                    to="/"
                    style={{
                      color: "darkslategray",
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
                  <img
                    src="https://res.cloudinary.com/desnqqj6a/image/upload/v1683887268/User-Profile-PNG-High-Quality-Image_mwetdc.png"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <p>Sales Manager</p>
                </div>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
        </>
    )
}