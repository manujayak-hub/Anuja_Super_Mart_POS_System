import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';
import { Col, Row } from "antd";
import Footers from "../../components/promoting/Footer.component";
import NavBar from "../../components/promoting/NavBar.component";

export default function RegisterDiscount(){

    const[productId,setProductId] = useState("");
    const[productName,setProductName] = useState("");
    const[productPrice,setProductPrice] = useState("");
    const[productDiscription,setProductDiscription] = useState("");
    const[quantityInStock,setQuantityInStock] = useState("");
    const[discount,setDiscount] = useState("");
    const[expireDate,setExpireDate] = useState("");
    const[imageUrl,setImageUrl] = useState("");
    
    function sendData(e){
        
        e.preventDefault();

        const newProduct ={
            productId,
            productName,
            productPrice,
            productDiscription,
            quantityInStock,
            discount,
            expireDate,
            imageUrl
        }


        axios.post("http://localhost:8000/product/",newProduct).then(()=>{
            alert("New product discount Added to the db")
            window.location.href='/discountmanagerhome';


        }).catch((err)=>{
            alert(err)
        })
    }

            

    

    return(
        <>
        <NavBar/>
        <div>
                <Row justify="center" className="mt-5">
                    <Col lg={18} sm={15}>

                        <h3>Create New Discount</h3>
                        <br /><br />
                        <form className="bs1 p-2" onSubmit={sendData} style={{
                            display: "flex",
                            borderRadius: "20px",
                            border: "1px solid #ddd",
                            boxShadow: "0 2px 4px rgba(0,0,0,1)",
                        }}>
                            <div style={{ flex: 1, padding: "35px", }}>
                                <div className="form-group">
                                    <label>Product Id: </label>
                                    <input type="text"
                                        className="form-control"
                                        id="productId" required onChange={(e)=>{setProductId(e.target.value);}}/>
                                </div>
                                <br />

                                <div className="form-group">
                                    <label>Product Name: </label>
                                    <input type="text"
                                        className="form-control" id="productName" required onChange={(e)=>{setProductName(e.target.value);}}/>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Product Price: </label>
                                    <input type="number"
                                        className="form-control"
                                        id="productPrice" required onChange={(e)=>{setProductPrice(e.target.value);}}
                                        
                                    />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label>Product Discription: </label>
                                    <input type="text"
                                        className="form-control"
                                        id="productDiscription" required onChange={(e)=>{setProductDiscription(e.target.value);}}
                                        
                                    />
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Quantity InStock : </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="quantityInStock" required onChange={(e)=>{setQuantityInStock(e.target.value);}}/>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Discount : </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="discount" required onChange={(e)=>{setDiscount(e.target.value);}}/>
                                </div>
                                <br />

                                <div className="form-group">
                                    <label>Date: </label>
                                    <div>
                                <DatePicker
                                    selected={expireDate}  
                                    onChange={(date) => setExpireDate(date)}  
                                    //dateFormat="yyyy-MM-dd"  
                                />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Image Url : </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageUrl" required onChange={(e)=>{setImageUrl(e.target.value);}}/>
                                </div>
                                <br />
                                <div className="form-group">
                                    <input type="submit" value="Create Product Log" className="btn btn-primary" style={{
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
                                    src="https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories-vector-isolated-concept-metaphor-illustration_335657-2764.jpg?t=st=1710846519~exp=1710850119~hmac=c28fcc956b3e857dfc774721f75422131f595fba0bb9dc997af8696f92816bf6&w=740"
                                    style={{ width: "400px", height: "400px" }}
                                />
                            </div>
                        </form>
                        <br />
                    </Col>
                </Row>

                <Footers />
            </div>
        </>
    )


}