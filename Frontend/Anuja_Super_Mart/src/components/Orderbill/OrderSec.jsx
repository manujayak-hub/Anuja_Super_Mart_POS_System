import React, { useState, useEffect } from "react";
import './OrderSec.scss';
import useOrderStore from "../../stores/useOrderStore";
import axios from '../../api/axios';
import jsPDF from 'jspdf';
import logo from '../../assets/Accountant/logo.png'

const OrderSec = ({ orderItems, removeFromOrder }) => {
    const [message, setMessage] = useState(""); 
    const [selectedItems, setSelectedItems] = useState([]); 
    const [orderIdCounter, setOrderIdCounter] = useState(() => {
        const storedOrderIdCounter = localStorage.getItem("orderIdCounter");
        return storedOrderIdCounter ? parseInt(storedOrderIdCounter) : 1;
    }); 
    const [customerId, setCustomerId] = useState(""); 
    const [paymentAmount, setPaymentAmount] = useState(0); 
    const [refreshKey, setRefreshKey] = useState(0); 


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

    const totalPrice = orderItems.reduce((total, item) => total + item.retailPrice, 0);
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

          
            generatePDFReceipt(orderId, currentDate);

            await updateInventory(orderItems);

           
            setRefreshKey(prevKey => prevKey + 1);

        } catch (error) {
            console.error("Error placing order:", error);
            setMessage("Failed to place order.");
        }
    };
    const handleUpdate = async (updatedItem) => {
        try {
            // Assuming your backend API expects a PATCH request to update the inventory item
            await axios.patch(`/inventory/${updatedItem._id}`, updatedItem);
            // Optionally, you can handle success cases here if needed
        } catch (error) {
            console.error("Error updating inventory item:", error);
            // Handle errors appropriately
            throw error; // Optionally, rethrow the error to handle it in the caller
        }
    };
    
    const updateInventory = async (items) => {
        try {
            await Promise.all(items.map(async (item) => {
                // Construct the updated item object with the decreased quantity
                const updatedItem = {
                    ...item,
                    quantityInStock: item.quantityInStock - 1 // Decrease the quantity by 1 for each item sold
                };
    
                // Make a PATCH request to update the inventory item
                await handleUpdate(updatedItem);
            }));
        } catch (error) {
            console.error("Error updating inventory:", error);
            // Handle errors appropriately
            throw error; // Optionally, rethrow the error to handle it in the caller
        }
    };
    
    

    const generatePDFReceipt = (orderId, currentDate) => {
        const doc = new jsPDF();
        
        const logoWidth = 30;
        const logoHeight = 30;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Draw border
        doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    
        doc.addImage(logo, 'jpg', 10, 5,logoWidth,logoHeight);

        // Title
        doc.setFontSize(18);
        doc.text("Anuja Super Mart", doc.internal.pageSize.getWidth() / 2, 15, 'center');

        // Subtitle
        doc.setFontSize(14);
        doc.text("Order Receipt", doc.internal.pageSize.getWidth() / 2, 25, 'center');

        // Order ID and Date
        doc.setFontSize(12);
        doc.text(`Order ID: ${orderId}`, doc.internal.pageSize.getWidth() / 2, 35, 'center');
        doc.text(`Date: ${currentDate}`,  doc.internal.pageSize.getWidth() / 2, 45, 'center');

        // Items
        let y = 55;
        orderItems.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.productName} - Rs ${item.retailPrice}`,  doc.internal.pageSize.getWidth() / 2, y, 'center');
            y += 10;
        });

        // Total, Payment, Balance
        doc.text(`Total: Rs ${totalPrice}`, doc.internal.pageSize.getWidth() / 2, y, 'center');
        doc.text(`Payment: Rs ${paymentAmount}`, doc.internal.pageSize.getWidth() / 2, y+10, 'center');
        doc.text(`Balance: Rs ${balance}`, doc.internal.pageSize.getWidth() / 2, y+20, 'center');

        // Save PDF
        doc.save(`receipt_${orderId}.pdf`);
    };
    

    return (
        <div key={refreshKey} className="OrderSec">
            {/* Order header */}
            <div name="order_header">
                <h1>Order</h1>
            </div>
            {/* Table of order items */}
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
                            <td>Rs: {item.retailPrice}</td>
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
            {/* Total price and payment input */}
            <div className="totalprice">
                <h5 style={{marginRight:'10px'}}>Total: Rs {totalPrice}</h5>
                <h5 style={{marginRight:'10px'}}>Balance: Rs {balance}</h5>
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
                    style={{marginRight:'10px', width:'240px'}}
                />
            </div>
            {/* Customer ID input */}
            <div className="customer_input">
                <input 
                    type="text" 
                    placeholder="Enter Customer ID" 
                    value={customerId} 
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        if (/^\d{0,10}$/.test(inputValue)) {
                            setCustomerId(inputValue);
                        }
                    }} 
                    style={{marginRight:'1px'}} 
                />
            </div>
         
            {/* Confirm order button */}
            <div className="addorder">
                <button onClick={handleConfirmOrder}>Confirm Order</button>
            </div>
            {/* Display message */}
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default OrderSec;
