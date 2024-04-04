// MenuCard.js
import React from 'react';

const MenuCard = ({ item, addToOrder }) => {
    const handleAddToOrder = () => {
        addToOrder(item);
    };

    return (
        <div className="inventory-card">
            <h3>{item.productId}</h3>
            <p>: {item.productName}</p>
            <p>Rs: {item.wholesalePrice}</p>
            <button onClick={handleAddToOrder}>Add</button>
        </div>
    );
};

export default MenuCard;
