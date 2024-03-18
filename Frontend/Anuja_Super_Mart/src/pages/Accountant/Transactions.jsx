import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import './Transactions.css'; 
import useTransactionStore from '../../stores/accountantStore'; 

const TransactionList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null); 
    const transactionStore = useTransactionStore(); 

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/transactions');
                setTransactions(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const handleUpdate = (transactionId) => {
        const selected = transactions.find(transaction => transaction._id === transactionId);
        setSelectedTransaction(selected);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedTransaction({
            ...selectedTransaction,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await axios.patch(`/transactions/${selectedTransaction._id}`, selectedTransaction);
            transactionStore.updateTransaction(selectedTransaction);
            setSelectedTransaction(null);
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    const handleDelete = async (transactionId) => {
        try {
            
            await axios.delete(`/transactions/${transactionId}`);
            setTransactions(transactions.filter(transaction => transaction._id !== transactionId));
            transactionStore.removeTransaction(transactionId);
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="transaction-list-container">
            <h1>Transactions</h1>
            {transactions.length > 0 ? (
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Date/Time</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Actions</th>
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
                                <td>
                                    <div className="actions-container">
                                        <button onClick={() => handleUpdate(transaction._id)}>Update</button>
                                        <button onClick={() => handleDelete(transaction._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No transactions found.</p>
            )}

            
            {selectedTransaction && (
                <div className="update-form">
                    <h2>Update Transaction</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Transaction ID:</label>
                            <input type="text" value={selectedTransaction.transactionID} readOnly />
                        </div>
                        <div>
                            <label>Date/Time:</label>
                            <input type="text" value={selectedTransaction.transactionDateTime} readOnly />
                        </div>
                        <div>
                            <label>Type:</label>
                            <input type="text" name="transactionType" value={selectedTransaction.transactionType} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Amount:</label>
                            <input type="text" name="amount" value={selectedTransaction.amount} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Method:</label>
                            <input type="text" name="transactionMethod" value={selectedTransaction.transactionMethod} onChange={handleInputChange} />
                        </div>
                       
                        <button type="submit">Update</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TransactionList;
