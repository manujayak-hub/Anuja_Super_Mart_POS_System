import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import './Transactions.css'; 
import useTransactionStore from '../../stores/accountantStore'; 
import Sidebar from '../../components/AccountantComponents/Sidebar';
import UpdateTransaction from './UpdateTransaction';

const TransactionList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null); 
    const [searchInput, setSearchInput] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteTransactionId, setDeleteTransactionId] = useState(null);
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

    const handleDelete = (transactionId) => {
        setDeleteTransactionId(transactionId);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/transactions/${deleteTransactionId}`);
            setTransactions(transactions.filter(transaction => transaction._id !== deleteTransactionId));
            transactionStore.removeTransaction(deleteTransactionId);
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
        setShowModal(false);
    };

    const handleUpdateSuccess = (updatedTransaction) => {
        setTransactions(transactions.map(transaction => 
            transaction._id === updatedTransaction._id ? updatedTransaction : transaction
        ));
        setSelectedTransaction(null);
    };

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const filteredTransactions = transactions.filter(transaction =>
        transaction.transactionID.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Sidebar />
            <div className="transaction-list-container">
                <h1 className="text-danger">Transactions</h1>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by transaction ID"
                        value={searchInput}
                        onChange={handleSearch}
                    />
                </div>
                {filteredTransactions.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr className="bg-danger text-white">
                                <th>Transaction ID</th>
                                <th>Date/Time</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <td>{transaction.transactionID}</td>
                                    <td>{transaction.transactionDateTime}</td>
                                    <td>{transaction.transactionType}</td>
                                    <td>{transaction.transactionAmount}</td>
                                    <td>{transaction.transactionMethod}</td>
                                    <td>
                                        <div className="actions-container">
                                            <button className="btn btn-info" onClick={() => handleUpdate(transaction._id)}>Update</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(transaction._id)}>Delete</button>
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
                    <UpdateTransaction 
                        transaction={selectedTransaction} 
                        onUpdate={handleUpdateSuccess} 
                    />
                )}

                {showModal && (
                    <div className="modal-overlay">
                        <div className="confirmation-modal">
                            <p>Are you sure you want to delete this transaction?</p>
                            <div className="modal-buttons">
                                <button className="btn btn-danger" onClick={confirmDelete}>Confirm</button>
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionList;
