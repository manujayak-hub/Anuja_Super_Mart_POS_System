import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import './Transactions.css'; 
import useTransactionStore from '../../stores/accountantStore'; 
import Sidebar from '../../components/AccountantComponents/Sidebar';
import UpdateTransaction from './UpdateTransaction';
import TransactionReport from './TransactionReport';

const TransactionList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null); 
    const [searchInput, setSearchInput] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteTransactionId, setDeleteTransactionId] = useState(null);
    const [totalAmounts, setTotalAmounts] = useState({});
    const transactionStore = useTransactionStore(); 

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/transactions');
                setTransactions(response.data);
                calculateTotalAmounts(response.data); // Calculate total amounts
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchTransactions();
    }, []);

    const calculateTotalAmounts = (transactions) => {
        const totalAmounts = {};
        transactions.forEach(transaction => {
            const type = transaction.transactionType;
            const amount = parseFloat(transaction.transactionAmount);
            totalAmounts[type] = (totalAmounts[type] || 0) + amount;
        });
        setTotalAmounts(totalAmounts);
    };

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
            calculateTotalAmounts(transactions.filter(transaction => transaction._id !== deleteTransactionId)); // Update total amounts after deletion
            saveTypeTotal('yourType'); // Save type total after deletion
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
        calculateTotalAmounts(transactions); // Update total amounts after update
        saveTypeTotal('yourType'); // Save type total after update
    };

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const filteredTransactions = transactions.filter(transaction =>
        transaction.transactionID.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const saveTypeTotal = async (type) => {
        try {
            // Reset type total values to 0 in the database
            await axios.post('/transactions/reset-type-total');
    
            // Filter out NaN values from totalAmounts
            const filteredTotalAmounts = Object.fromEntries(
                Object.entries(totalAmounts).filter(([key, value]) => !isNaN(value))
            );
    
            // Check if there are any valid total amounts to save
            if (Object.keys(filteredTotalAmounts).length === 0) {
                console.log('No valid total amounts to save.');
                return;
            }
    
            // Send POST request with both type and totalAmounts
            await axios.post('/transactions/save-type-total', { type, totalAmounts: filteredTotalAmounts });
            console.log('Type total saved successfully');
        } catch (error) {
            console.error('Error saving type total:', error);
        }
    };

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
                <div className="transaction-table-wrapper">
                <div style={{ maxHeight: "360px", overflowY: "auto" }}>
    <table className="table table-striped">
        <thead style={{ position: "sticky", top: "0", zIndex: "1", background: "#fff" }}>
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
</div>

                </div>
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
                <TransactionReport totalAmounts={totalAmounts} />
                <button className="btn btn-danger" onClick={() => {
            saveTypeTotal('yourType');
    alert('Transaction Summary Added Successfully');
}}>Save Summary</button>

            </div>
        </div>
    );
};

export default TransactionList;
