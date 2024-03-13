import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.get('http://localhost:8005/transactions') // Corrected endpoint
      .then(response => {
        // Set the fetched data to state
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Transactions List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date/Time</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.transactionID}</td>
              <td>{transaction.transactionDateTime}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transactionMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
