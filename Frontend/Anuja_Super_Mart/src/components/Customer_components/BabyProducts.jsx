// BabyProducts.js

import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Card from '../Customer_components/Card'; // Import the Card component

const BabyProducts = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventoryByCategory = async () => {
      try {
        const category = "baby_products"; // Hardcoded category name
        const response = await axios.get(`/inventory/category/${category}`);
        const inventoryData = response.data;
        console.log("Inventory data from API:", inventoryData); // Log the fetched data
        setInventory(inventoryData);
      } catch (error) {
        console.error('Error fetching baby products:', error);
      }
    };

    fetchInventoryByCategory();
  }, []);

  console.log("Current Inventory:", inventory); // Log the current inventory

  return (
    <div>
      <center>
        <h1>Baby Products</h1>
      </center>
      <div className="products">
        {inventory.map((product) => (
          <div key={product.productId} className="product">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BabyProducts;
