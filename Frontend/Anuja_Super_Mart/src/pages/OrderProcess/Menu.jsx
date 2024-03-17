// Menu.js
import React, { useState, useEffect } from 'react';
import Header2 from "../../components/OrderProcess/MenuHeader";
import OrderSec from "../../components/Orderbill/OrderSec";
import MenuNav from "../../components/OrderProcess/MenuNavbar";
import MenuCard from "../../components/OrderProcess/MenuCard";
import './Menu.css';

const Menu = () => {
    const [inventory, setInventory] = useState([]);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/inventory')
            .then(response => response.json())
            .then(data => setInventory(data))
            .catch(error => console.error('Error fetching inventory:', error));
    }, []);

    const addToOrder = (item) => {
        setOrderItems([...orderItems, item]);
    };

    const removeFromOrder = (indexToRemove) => {
        const updatedItems = orderItems.filter((item, index) => index !== indexToRemove);
        setOrderItems(updatedItems);
    };

    return ( 
        <>
            <Header2/>
            <OrderSec orderItems={orderItems} removeFromOrder={removeFromOrder} />
            <MenuNav/> 
            <div className="inventory-container">
                {inventory.map(item => (
                    <MenuCard key={item.id} item={item} addToOrder={addToOrder} />
                ))}
            </div>
        </>
    );
}

export default Menu;
