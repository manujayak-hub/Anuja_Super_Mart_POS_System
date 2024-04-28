import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/AccountantComponents/Sidebar';
import axios from '../../api/axios';

function Dash() {
    const [inventory, setInventory] = useState([]);
    const [orders, setOrders] = useState([]);
    const [inventoryTotalAmount, setInventoryTotalAmount] = useState(0);
    const [ordersTotalAmount, setOrdersTotalAmount] = useState(0);
    const [lastFetchDateTime, setLastFetchDateTime] = useState('');
    const [error, setError] = useState(null);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!isFetched) {
            fetchTransactions();
            setIsFetched(true);
        }
    }, [isFetched]);

    useEffect(() => {
        calculateTotalAmount();
    }, [inventory, orders]);

    const fetchTransactions = async () => {
        try {
            const inventoryResponse = await fetch('http://localhost:8000/inventory');
            const ordersResponse = await axios.get('http://localhost:8000/order');
            if (!inventoryResponse.ok || !ordersResponse.status === 200) {
                throw new Error('Failed to fetch transactions');
            }
            const inventoryData = await inventoryResponse.json();
            const ordersData = ordersResponse.data;
            setInventory(inventoryData);
            setOrders(ordersData);
            updateLastFetchDateTime();
        } catch (error) {
            setError(error.message);
        }
    };

    const calculateTotalAmount = () => {
        let inventoryTotal = 0;
        inventory.forEach(item => {
            inventoryTotal += item.quantityInStock * item.wholesalePrice;
        });
        setInventoryTotalAmount(inventoryTotal);

        let ordersTotal = 0;
        orders.forEach(order => {
            ordersTotal += parseFloat(order.TotalAmount);
        });
        setOrdersTotalAmount(ordersTotal);
    };

    const updateLastFetchDateTime = () => {
        const currentDateTime = new Date().toLocaleString();
        setLastFetchDateTime(currentDateTime);
    };

    return (
        <div className="container-fluid" style={{ backgroundColor: 'lightgray', minHeight: '100vh' }}>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10" style={{ paddingTop: '250px' }}>
                    <div style={{ marginBottom: '30px' }}></div>
                    <div className="card">
                        <div className="card-header" style={{ backgroundColor: '#f08080' }}>
                            <h5 className="mb-0">Fetched Transaction Details</h5>
                        </div>
                        <div className="card-body">
                            {error ? (
                                <div style={{ color: 'red' }}>Error: {error}</div>
                            ) : (
                                <div>
                                    <p className="card-text">Inventory Total Amount: {inventoryTotalAmount}</p>
                                    <p className="card-text">Orders Total Amount: {ordersTotalAmount}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-3">
                        <p>Last Fetched Date/Time: {lastFetchDateTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dash;
