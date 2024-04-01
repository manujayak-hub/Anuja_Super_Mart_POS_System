// Menu.js

import React, { useState, useEffect } from 'react';
import Header2 from "../../components/OrderProcess/MenuHeader";
import OrderSec from "../../components/Orderbill/OrderSec";
import MenuNav from "../../components/OrderProcess/MenuNavbar";
import MenuCard from "../../components/OrderProcess/MenuCard";
import './Menu.scss'; // Import SCSS file

const Menu = () => {
    const [inventory, setInventory] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Beverages')
    const categories = [
        {
            name:'baby_products',
        },
        {
            name:'Beverages',
        },
        {
            name:'PersonalCare',
        },
        {
            name:'Cooking_Essential',
        },
        {
            name:'Dairy_products',
        },
        {
            name:'Snacks',
        },
    ]

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

            <div className="menu-categories">
                {categories.map((category) =>(
                    <div key={category.name} className={`category-container ${selectedCategory === category.name ? "category-active" : ""}`}
                        onClick={() => setSelectedCategory(category.name)}
                    >
                        <h4 className="category-name">{category.name}</h4>
                    </div>
                ))}
            </div>
            <div className="inventory-container">
                {inventory.filter(i => i.category === selectedCategory).map(item => (
                    <MenuCard key={item.id} item={item} addToOrder={addToOrder} />
                ))}
            </div>
        </>
    );
}

export default Menu;
