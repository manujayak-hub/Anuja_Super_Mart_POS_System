import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/AccountantComponents/Sidebar';
import axios from '../../api/axios';

function Dash() {
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await fetch('http://localhost:8000/inventory');
            if (!response.ok) {
                throw new Error('Failed to fetch inventory');
            }
            const data = await response.json();
            setInventory(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAddTransaction = async (product) => {
        try {
            const transactionData = {
                transactionType: product.productName,
                amount: product.quantityInStock * product.wholesalePrice,
                transactionDateTime: product.createdAt
            };
            await axios.post('http://localhost:8000/transactions', transactionData);
            console.log('Transaction added successfully.');
        } catch (error) {
            console.error('Error adding transaction:', error.message);
        }
    };

    return (
      <div className="dashboard">
          <Sidebar />
          {error ? (
              <div>Error: {error}</div>
          ) : (
              <table>
                  <thead>
                      <tr>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Wholesale Price</th>
                          <th>Date/Time</th>
                          <th>Total Wholesale Value</th>
                      </tr>
                  </thead>
                  <tbody>
                      {inventory.map(item => (
                          <tr key={item.productId}>
                              <td>{item.productName}</td>
                              <td>{item.quantityInStock}</td>
                              <td>{item.wholesalePrice}</td>
                              <td>{item.createdAt}</td>
                              <td>{item.quantityInStock * item.wholesalePrice}</td>
                              <td>
                                  <button onClick={() => handleAddTransaction(item.productId)}>Add</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          )}
      </div>
  );
}

export default Dash;
