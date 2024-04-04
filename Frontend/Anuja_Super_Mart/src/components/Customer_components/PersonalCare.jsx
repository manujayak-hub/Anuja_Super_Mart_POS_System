import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Card from '../Customer_components/Card';

const PersonalCare = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventoryByCategory = async () => {
      try {
        const category = "PersonalCare";
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

  console.log("Current Inventory:", inventory); // Log the current inventory

  const addToOrder = (product) => {
    // Define the logic to add the product to the order/cart
    console.log('Adding product to order:', product);
    // You can implement the functionality to add the product to the order/cart here
  };

  return (
    <div>
      <center>
        <h1></h1>
      </center>
      <div className="products-container">
        {inventory.map((product) => (
          <div key={product.productId} className="product">
            <Card product={product} addToOrder={addToOrder} />
          </div>
        ))}
      </div>
      <style jsx>{`
        .products-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between; // Adjust as needed
        }
        
        .product {
          width: 30%; // Adjust the width of each product card
          margin-bottom: 20px; // Add margin between products
        }

        // Media query for responsiveness
        @media (max-width: 768px) {
          .product {
            width: 45%; // Adjust width for smaller screens
          }
        }

        @media (max-width: 576px) {
          .product {
            width: 100%; // Full width for extra small screens
          }
        }
      `}</style>
    </div>
  );
};

export default PersonalCare;
