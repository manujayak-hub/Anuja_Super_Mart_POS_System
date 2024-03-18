import React, { useState } from "react";
import './OrderSec.css';
import useOrderStore from "../../stores/useOrderStore";
import axios from '../../api/axios'

const OrderSec = ({ orderItems, removeFromOrder }) => {
    const [message, setMessage] = useState(""); // State to hold success or error message

    // Calculate total price of the order
    const totalPrice = orderItems.reduce((total, item) => total + item.wholesalePrice, 0);

    const handleConfirmOrder = async () => {
        try {
            // Create the new order object
            const newOrder = await axios.post("/order",{
                ItemName: "fdgfhd",
                TotalAmount:450 
                // Add any other relevant data for the order
     } ) 

            // Add the new order to the store
            await useOrderStore.getState().addOrder(newOrder);
            setMessage("Order placed successfully.");
            // Optionally, clear order items from state after successful order
            // removeFromOrder();
        } catch (error) {
            console.error("Error placing order:", error);
            setMessage("Failed to place order.");
        }
    };

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
            <div className="addorder">
                <button onClick={handleConfirmOrder}>Confirm Order</button>
            </div>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default OrderSec;
