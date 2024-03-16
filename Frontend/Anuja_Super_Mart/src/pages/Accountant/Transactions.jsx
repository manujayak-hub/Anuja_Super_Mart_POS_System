import React, { useEffect, useState } from 'react';
import axios from '../../api/axios'; 
const TransactionList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8005/transactions');
        setTransactions(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <h1>Transaction List</h1>
        {transactions.length > 0 ? (
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date/Time</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
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
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </>
  );
};

export default TransactionList;
