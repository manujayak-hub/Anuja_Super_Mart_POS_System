import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/AccountantComponents/Sidebar';
import axios from '../../api/axios';
import { Bar } from 'react-chartjs-2';

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

    // Chart 
    const inventoryChartData = {
        labels: ['Inventory'],
        datasets: [
            {
                label: 'Total Amount',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
                data: [inventoryTotalAmount]
            }
        ]
    };

    const ordersChartData = {
        labels: ['Orders'],
        datasets: [
            {
                label: 'Total Amount',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: [ordersTotalAmount]
            }
        ]
    };

    return (
        <div className="container-fluid" style={{ backgroundColor: 'lightgray', minHeight: '100vh' }}>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
                        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', margin: '20px', width: '90%' }}>
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
                            <div className="row">
                                <div className="col-md-6">
                                    <Bar
                                        data={inventoryChartData}
                                        width={100}
                                        height={300}
                                        options={{
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Bar
                                        data={ordersChartData}
                                        width={100}
                                        height={300}
                                        options={{
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dash;
