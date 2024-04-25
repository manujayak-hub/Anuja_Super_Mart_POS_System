import React, { useState, useEffect } from "react";
import './OrderSec.scss';
import useOrderStore from "../../stores/useOrderStore";
import axios from '../../api/axios';
import jsPDF from 'jspdf';

const OrderSec = ({ orderItems, removeFromOrder }) => {
    const [message, setMessage] = useState(""); 
    const [selectedItems, setSelectedItems] = useState([]); 
    const [orderIdCounter, setOrderIdCounter] = useState(() => {
        const storedOrderIdCounter = localStorage.getItem("orderIdCounter");
        return storedOrderIdCounter ? parseInt(storedOrderIdCounter) : 1;
    }); 
    const [customerId, setCustomerId] = useState(""); 
    const [paymentAmount, setPaymentAmount] = useState(0); 

    useEffect(() => {
        localStorage.setItem("orderIdCounter", orderIdCounter.toString());
    }, [orderIdCounter]);

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
    const balance = paymentAmount - totalPrice;

    const handleRemoveFromOrder = (index) => {
        removeFromOrder(index);
        
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems.splice(index, 1);
        setSelectedItems(updatedSelectedItems);
    };

    const handleConfirmOrder = async () => {
        try {
            if (orderItems.length === 0) {
                setMessage("Please add items to the order before confirming.");
                return;
            }

            const orderId = generateOrderId(); 
            const currentDate = getCurrentDate(); 

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

            // Generate and download PDF receipt
            generatePDFReceipt(orderId, currentDate);

        } catch (error) {
            console.error("Error placing order:", error);
            setMessage("Failed to place order.");
        }
    };

    const generatePDFReceipt = (orderId, currentDate) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Anuja Super Mart", doc.internal.pageSize.getWidth() / 2, 10, 'center');

        doc.setFontSize(14);
        doc.text("Order Receipt", doc.internal.pageSize.getWidth() / 2, 20, 'center');

        doc.setFontSize(12);
        doc.text(`Order ID: ${orderId}`, 10, 30);
        doc.text(`Date: ${currentDate}`, 10, 40);

        let y = 50;
        orderItems.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.productName} - Rs ${item.wholesalePrice}`, 10, y);
            y += 10;
        });

        doc.text(`Total: Rs ${totalPrice}`, 10, y);
        doc.text(`Payment: Rs ${paymentAmount}`, 10, y + 10);
        doc.text(`Balance: Rs ${balance}`, 10, y + 20);

        doc.save(`receipt_${orderId}.pdf`);
    };

    return (
        <div className="OrderSec">
            <div name="order_header">
                <h1>Order</h1>
            </div>
            <table className="itemlist_order">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.productName}</td>
                            <td>Rs: {item.wholesalePrice}</td>
                            <td>
                                <button 
                                    name="remove" 
                                    onClick={() => handleRemoveFromOrder(index)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="totalprice">
                <h5>Total: Rs {totalPrice}</h5>
                <h5>Balance: Rs {balance}</h5>
                <input 
                 type="number" 
                 placeholder="Enter Payment Amount" 
                 value={paymentAmount} 
                 onChange={(e) => {
                 const inputValue = parseInt(e.target.value);
                 if (!isNaN(inputValue) && inputValue >= 0) {
                 setPaymentAmount(inputValue);
                 }
                 }} 
                 style={{marginRight:'10px'}}
                />

                
            </div>
            <div className="customer_input">
    <input 
        type="text" 
        placeholder="Enter Customer ID" 
        value={customerId} 
        onChange={(e) => {
            const inputValue = e.target.value;
            // Check if the input consists only of digits and has a length of 10
            if (/^\d{0,10}$/.test(inputValue)) {
                setCustomerId(inputValue);
            }
        }} 
        style={{marginRight:'1px'}} 
    />
</div>

            <div className="addorder">
                <button onClick={handleConfirmOrder}>Confirm Order</button>
            </div>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default OrderSec;
