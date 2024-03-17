import React, { useState } from "react";
import axios from "../../api/axios";

const Cart = ({ orderItems, removeFromOrder, setOrderItems }) => {
    const [message, setMessage] = useState(""); // State to hold success or error message

    // Calculate total price of the order
    const totalPrice = orderItems ? orderItems.reduce((total, item) => total + item.retailPrice, 0) : 0;


    const addtocartdb = async (product) => {
        try {
            console.log("Adding to cart:", product); // Log the product before sending
            const response = await axios.post("/Cart", {
                OrderID: product.productId,
                ItemName: product.productName,
                wholesalePrice: product.wholesalePrice,
                retailPrice: product.retailPrice,
                // Add any other fields you need to send
            });
            console.log("Response:", response.data); // Log the response from the server
            setMessage(`${product.productName} added to cart successfully.`);
        } catch (error) {
            console.error("Error adding to cart:", error); // Log any errors
            setMessage(`Failed to add ${product.productName} to cart.`);
        }
    };

    const handleCheckout = async () => {
        try {
            for (const product of orderItems) {
                await addtocartdb(product);
            }
            setMessage("Order placed successfully.");
            setOrderItems(); // Clear the cart after successful order
        } catch (error) {
            console.error("Error placing order:", error);
            setMessage("Failed to place order.");
        }
    };

    return (
        <div className="Cart">
            <div name="order_header">
                <h1>Order</h1>
            </div>
            <div name="itemlist_order">
            {orderItems && orderItems.map((product, index) => (
                    <div key={index}>
                        <p>{product.productID}</p>
                        <p>{product.productName}</p>
                        <p>Rs: {product.retailPrice}</p>
                        <button onClick={() => removeFromOrder(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <button onClick={handleCheckout}>Place Order</button>
            <div className="totalprice">
                <h5>Total: Rs {totalPrice}</h5>
            </div>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default Cart;
