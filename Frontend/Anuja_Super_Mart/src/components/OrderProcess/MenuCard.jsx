import React from 'react';
import './MenuCard.scss'; // Import SCSS file

const MenuCard = ({ item, addToOrder }) => {
    const handleAddToOrder = () => {
        addToOrder(item);
    };

    return (
        <div className="inventory-card">
            <h3 className="product-id">{item.productId}</h3>
            <p className="product-name">: {item.productName}</p>
            <p className="wholesale-price">Rs: {item.retailPrice}</p>
            <img  src={item.imageUrl} style={{ width: "70px", height: "70px", marginLeft:"40px",marginRight:"20px"}}/>
            <button className="add-button" onClick={handleAddToOrder}>Add</button>
        </div>
    );
};

export default MenuCard;
