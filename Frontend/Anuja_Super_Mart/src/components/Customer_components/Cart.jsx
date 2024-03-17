// Cart.js
import React from "react";

const Cart = ({ orderItems, removeFromOrder }) => {
    // Calculate total price of the order
    const totalPrice = orderItems.reduce((total, item) => total + item.wholesalePrice, 0);

    return (
        <div className="Cart">
            <div name="order_header">
                <h1>Order</h1>
            </div>
            <div name="itemlist_order">
                {orderItems.map((product, index) => (
                    <div key={index}>
                        <p>{product.productName}</p>
                        <p>Rs: {product.wholesalePrice}</p>
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

export default Cart;