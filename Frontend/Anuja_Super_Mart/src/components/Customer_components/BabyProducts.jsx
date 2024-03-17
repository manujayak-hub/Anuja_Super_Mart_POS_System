// BabyProducts.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Card from '../Customer_components/Card';
import Cart from './Cart';

const BabyProducts = () => {
  const [inventory, setInventory] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchInventoryByCategory = async () => {
      try {
        const category = "baby_products";
        const response = await axios.get(`/inventory/category/${category}`);
        const inventoryData = response.data;
        console.log("Inventory data from API:", inventoryData);
        setInventory(inventoryData);
      } catch (error) {
        console.error('Error fetching baby products:', error);
      }
    };

    fetchInventoryByCategory();
  }, []);

  const addToOrder = (product) => {
    const updatedOrderItems = [...orderItems, product];
    setOrderItems(updatedOrderItems);
    console.log("Updated Order Items:", updatedOrderItems);
  };
  

  const removeFromOrder = (indexToRemove) => {
    const updatedItems = orderItems.filter((product, index) => index !== indexToRemove);
    setOrderItems(updatedItems);
  };

  console.log("Current Inventory:", inventory);

  return (
    <div>
      <center>
        <h1>Baby Products</h1>
      </center>
      <div className="products">
        {inventory.map((product) => (
          <div key={product.productId} className="product">
            {/* Pass addToOrder function to Card component */}
            <Card product={product} key={product._id} addToOrder={addToOrder} />
          </div>
        ))}
      </div>
      {/* Pass orderItems and removeFromOrder function to Cart component */}
      <Cart orderItems={orderItems} removeFromOrder={removeFromOrder} />
    </div>
  );
};

export default BabyProducts;
