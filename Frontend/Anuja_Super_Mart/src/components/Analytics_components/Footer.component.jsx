import { Component } from "react";
import { Footer } from "antd/es/layout/layout";

export default class Footers extends Component{


    render() {
        return (
            <>
                <Footer style={{ textAlign: "center",
                // backgroundColor: "#FD204F" 
            }}>
                    Admin Dashbord was ©2024 Created by{" "}
                    <span
                        style={{
                            color: "darkslategray",
                            letterSpacing: "1.5px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            display: "inline-block",
                            width: "100%",
                            
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        }}
                    >
                        Kavin | Enter IT Number
                    </span>
                </Footer>


            </>
        )
    }



}