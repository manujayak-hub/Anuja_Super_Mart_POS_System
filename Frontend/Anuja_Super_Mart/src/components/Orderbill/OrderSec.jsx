// OrderSec.js
import React from "react";
import './OrderSec.css';

const OrderSec = ({ orderItems, removeFromOrder }) => {
    // Calculate total price of the order
    const totalPrice = orderItems.reduce((total, item) => total + item.wholesalePrice, 0);

    return (
        <div className="OrderSec">
            <div name="order_header">
                <h1>Order</h1>
            </div>
            <div name="itemlist_order">
                {orderItems.map((item, index) => (
                    <div key={index}>
                        <p>{item.productName}</p>
                        <p>Rs: {item.wholesalePrice}</p>
                        <button onClick={() => removeFromOrder(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="totalprice">
                <h5>Total: Rs {totalPrice}</h5>
            </div>
        </div>
    );
};

export default OrderSec;
