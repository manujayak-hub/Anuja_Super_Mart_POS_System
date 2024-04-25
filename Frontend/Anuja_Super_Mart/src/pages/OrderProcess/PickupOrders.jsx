import React, { useState, useEffect } from 'react';
import './PickupOrders.scss'; // Import SCSS file
import MenuNav from '../../components/OrderProcess/MenuNavbar';

const PickupOrders = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/Cart'); // Assuming your API endpoint is '/cart'
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pickup-orders-container"> 
      <MenuNav />
      <div className='topic'><h1>Pickup Orders</h1></div>
      {/* Render your cart items here */}
      <ul>
        {cart.map(item => (
          <li key={item.id}>
           
            {item.ItemName} - {item.Quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PickupOrders;
