import React, { useState, useEffect } from 'react';
import './PickupOrders.scss';
import MenuNav from '../../components/OrderProcess/MenuNavbar';
import axios from 'axios';
import {  Table } from 'react-bootstrap';

const PickupOrders = () => {
  const [pickup, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pickup'); 
        setPickups(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pickups:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pickup-orders-container"> 
      <MenuNav />
      <div className='topic'style={{color:'red'}}><h1>Pickup Orders</h1></div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        pickup.map((pickupItem, index) => (
          <div key={index} style={{ width: '400px' }}> {/* Set the width for each table */}
            <Table key={index} className="pickup-table" style={{ borderCollapse: 'collapse', border: '1px solid black', width: '100%', tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', width: '33%' }}>Item Name</th>
                  <th style={{ border: '1px solid black', width: '33%' }}>Quantity</th>
                  <th style={{ border: '1px solid black', width: '33%' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {pickupItem.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td style={{ border: '1px solid black' }}>{item.itemName}</td>
                    <td style={{ border: '1px solid black' }}>{item.quantity}</td>
                    <td style={{ border: '1px solid black' }}>{item.itemPrice}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p>Total Price: {pickupItem.TotalPrice}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PickupOrders;
