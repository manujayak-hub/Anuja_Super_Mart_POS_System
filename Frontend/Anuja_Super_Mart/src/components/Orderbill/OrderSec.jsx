import React, { useState } from "react";
import './OrderSec.css';
import useOrderStore from "../../stores/useOrderStore";
import axios from '../../api/axios'

const OrderSec = ({ orderItems, removeFromOrder }) => {
    const [message, setMessage] = useState(""); 
    const [selectedItems, setSelectedItems] = useState([]); 
    const [orderIdCounter, setOrderIdCounter] = useState(1); 
    const [customerId, setCustomerId] = useState(""); 

    const generateOrderId = () => {
        const orderId = `on${String(orderIdCounter).padStart(3, '0')}`;
        setOrderIdCounter(orderIdCounter + 1); 
        return orderId;
    };

    const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString(); 
    };

    const totalPrice = orderItems.reduce((total, item) => total + item.wholesalePrice, 0);

    const handleRemoveFromOrder = (index) => {
        removeFromOrder(index);
        
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems.splice(index, 1);
        setSelectedItems(updatedSelectedItems);
    };

    const handleConfirmOrder = async () => {
        try {
            const orderId = generateOrderId(); 
            const currentDate = getCurrentDate(); 

            // Create the new order object
            const newOrder = await axios.post("/order", {
                orderId: orderId,
                customerId: customerId,
                ItemID: "1543",
                ItemName: orderItems.map(item => item.productName).join(', '), 
                Quantity: orderItems.length, 
                TotalAmount: totalPrice,
                date: currentDate 
            });

            
            await useOrderStore.getState().addOrder(newOrder);
            setMessage("Order placed successfully.");
           
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
                        <p>{item.productName}
                            <button name="remove" onClick={() => handleRemoveFromOrder(index)}>Remove</button>
                        </p>
                        <p>Rs: {item.wholesalePrice}</p>
                    </div>
                ))}
            </div>
            <div className="totalprice">
                <h5>Total: Rs {totalPrice}</h5>
            </div>
            <div className="customer_input">
                <input type="text" placeholder="Enter Customer ID" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
            </div>
            <div className="addorder">
                <button onClick={handleConfirmOrder}>Confirm Order</button>
            </div>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default OrderSec;
