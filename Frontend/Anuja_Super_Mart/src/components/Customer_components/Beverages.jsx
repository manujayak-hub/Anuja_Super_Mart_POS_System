import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Card from '../Customer_components/Card'; // Import the Card component

const Beverages = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventoryByCategory = async () => {
      try {
        const category = "Beverages";
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

  const addToOrder = (product) => {
    // Define the logic to add the product to the order/cart
    console.log('Adding product to ordfsbfbser:', product);
    // You can implement the functionality to add the product to the order/cart here
  };

  return (
    <div>
      <center>
        <h1></h1>
      </center>
      <div className="products">
        {inventory.map((product) => (
          <div key={product.productId} className="product">
            <Card product={product} addToOrder={addToOrder} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Beverages;