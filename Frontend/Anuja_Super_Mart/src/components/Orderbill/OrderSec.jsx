import React from "react";
import { Link } from 'react-router-dom';
import './OrderSec.css';



const OrderSec = () => {
    return ( 
        <>
         <div className="OrderSec">
            <div name="order_header"> 
                <h1> Order </h1>
            </div>
            <div name="itemlist">
                
            </div>
            <div>
                <h5>Total:</h5>
                <h5>Balance:</h5>
                <button>Confirm order</button>
            </div>
        </div>
        </>


     );
}
 
export default OrderSec;