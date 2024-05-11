import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MenuCard.scss'; // Import SCSS file

const MenuCard = ({ item, addToOrder }) => {
    const [discountedPrice, setDiscountedPrice] = useState(null);

    useEffect(() => {
        // Fetch discount information for the current product
        axios.get(`http://localhost:8000/discount/${item.productId}`)
            .then(response => {
                // Calculate discounted price
                const discountPrice = item.retailPrice - response.data.discountAmount;
                setDiscountedPrice(discountPrice);
            })
            .catch(error => console.error(error));
    }, [item.productId, item.retailPrice]);

    const handleAddToOrder = () => {
        addToOrder(item);
    };

    return (
        <div className="inventory-card">
            <h3 className="product-id">{item.productId}</h3>
            <p className="product-name">: {item.productName}</p>
            <p className="wholesale-price">Rs: {discountedPrice !== null ? discountedPrice : item.retailPrice}</p>
            <img src={item.imageUrl} style={{ width: "70px", height: "70px", marginLeft: "40px", marginRight: "20px" }} alt={item.productName} />
            <button className="add-button" onClick={handleAddToOrder}>Add</button>
        </div>
    );
};

export default MenuCard;
