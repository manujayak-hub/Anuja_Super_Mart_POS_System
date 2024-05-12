import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import './Transactions.css';
import useTransactionStore from '../../stores/accountantStore';
import Sidebar from '../../components/AccountantComponents/Sidebar';
import UpdateTransaction from './UpdateTransaction';
import TransactionReport from './TransactionReport';
import * as XLSX from 'xlsx'; 
import jsPDF from 'jspdf';


const TransactionList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteTransactionId, setDeleteTransactionId] = useState(null);
    const [totalAmounts, setTotalAmounts] = useState({});
    const [typeTotals, setTypeTotals] = useState([]); 
    const transactionStore = useTransactionStore();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/transactions');
                setTransactions(response.data);
                calculateTotalAmounts(response.data);
                fetchTypeTotals(); 
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const calculateTotalAmounts = (transactions) => {
        const totalAmounts = { totalExpenses: 0, totalSales: 0 };
        transactions.forEach(transaction => {
            const type = transaction.transactionType;
            const amount = parseFloat(transaction.transactionAmount);
    
            if (type === 'sales') {
                totalAmounts.totalSales += amount;
            } else {
                totalAmounts.totalExpenses += amount;
            }
        });
    
        const income = totalAmounts.totalSales - totalAmounts.totalExpenses;
        setTotalAmounts({ ...totalAmounts, income });
    };

    const fetchTypeTotals = async () => {
        try {
            const response = await axios.get('/transactions/type-totals');
            setTypeTotals(response.data);
        } catch (error) {
            console.error('Error fetching type totals:', error);
        }
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
            calculateTotalAmounts(transactions.filter(transaction => transaction._id !== deleteTransactionId));
            saveTypeTotal('yourType');
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
        calculateTotalAmounts(transactions);
        saveTypeTotal('yourType');
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
            await axios.post('/transactions/reset-type-total');

            const filteredTotalAmounts = Object.fromEntries(
                Object.entries(totalAmounts).filter(([key, value]) => !isNaN(value))
            );

            if (Object.keys(filteredTotalAmounts).length === 0) {
                console.log('No valid total amounts to save.');
                return;
            }

            await axios.post('/transactions/save-type-total', { type, totalAmounts: filteredTotalAmounts });
            console.log('Type total saved successfully');
        } catch (error) {
            console.error('Error saving type total:', error);
        }
    };

    const handleDownload = () => {
        const doc = new jsPDF();
    
        // Get current date and time
        const currentDate = new Date();
        const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    
        // Add report title
        const titleText = 'Transaction Data Report';
        const titleWidth = doc.getTextDimensions(titleText).w;
        const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
        doc.text(titleText, titleX, 10);
    
        // Add generated date and time
        const dateText = `Generated on: ${formattedDate}`;
        const dateWidth = doc.getTextDimensions(dateText).w;
        const dateX = (doc.internal.pageSize.width - dateWidth) / 2;
        doc.text(dateText, dateX, 20);
    
        // Set table header style
        doc.setTextColor(255, 255, 255); // White color for header text
        doc.setFillColor(220, 53, 69); // "Danger" color for header background
    
        // Generate the table
        doc.autoTable({
            head: [['Transaction ID', 'Date Time', 'Type', 'Amount', 'Method']],
            body: filteredTransactions.map(transaction => [
                transaction.transactionID,
                transaction.transactionDateTime,
                transaction.transactionType,
                transaction.transactionAmount,
                transaction.transactionMethod
            ]),
            startY: 30 // Set the Y position for the table
        });
    
        // Save the PDF
        doc.save('transaction_data_report.pdf');
    };

    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
    
        const filteredTransactionsWithoutColumns = filteredTransactions.map(transaction => {
            const { totalSales, totalPayments, totalUtilityBills, totalRevenue, __v, ...filteredTransaction } = transaction;
            return filteredTransaction;
        });
    
        const worksheet = XLSX.utils.json_to_sheet(filteredTransactionsWithoutColumns);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    
        // Add type totals to the Excel sheet
        const typeTotalsSheet = XLSX.utils.json_to_sheet(typeTotals);
        XLSX.utils.book_append_sheet(workbook, typeTotalsSheet, "TypeTotals");
    
        XLSX.writeFile(workbook, "transactions.xlsx");
    };
    
    
    
    

    return (
        <div>
            <Sidebar />
            <div className="transaction-list-container" style={{ backgroundColor: 'lightgray', minHeight: '100vh' }}>
            <div className="text-danger" style={{ textAlign: 'center', paddingLeft: '20px', fontSize: '2rem', fontWeight: 'bold' }}>Accountant Dashboard</div>


                <div className="search-bar-container " >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by transaction ID"
                        value={searchInput}
                        onChange={handleSearch}
                    />
                </div>
                <div className="transaction-table-wrapper" style={{ padding: '10px 20px' }}>
    <div style={{ maxHeight: "360px", overflowY: "auto", borderRadius: '10px' }}>
        <table className="table table-striped" style={{ borderRadius: '10px' }}>
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
                <div style={{ display: 'inline-block' }}>
                    <button className="btn btn-danger" style={{ marginRight: '10px' }} onClick={() => {
                        saveTypeTotal('yourType');
                        alert('Transaction Summary Added Successfully');
                    }}>Save Summary</button>
                    <button className="btn btn-primary" onClick={handleDownload}>Download PDF</button>
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
