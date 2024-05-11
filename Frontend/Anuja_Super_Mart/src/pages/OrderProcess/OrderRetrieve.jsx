import React, { useState, useEffect } from "react";
import MenuNav from "../../components/OrderProcess/MenuNavbar";
import useOrderStore from "../../stores/useOrderStore";
import axios from '../../api/axios';
import "./OrderRetrieve.scss";
import OrderEditForm from "../../components/OrderProcess/OrderEditForm";

const OrderRetrieve = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [editOrder, setEditOrder] = useState(null);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { orders, setOrders, removeOrder, updateOrder } = useOrderStore();

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("/order");
                setOrders(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDeleteOrder = async (orderId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        if (isConfirmed) {
            try {
                await axios.delete(`/order/${orderId}`);
                removeOrder(orderId);
            } catch (error) {
                setError(error);
            }
        }
    };

    const handleEditOrder = (order) => {
        setEditOrder(order);
    };

    const handleUpdateOrder = async (updatedOrder) => {
        try {
            await axios.put(`/order/${updatedOrder._id}`, updatedOrder);
            updateOrder(updatedOrder);
            setEditOrder(null);
        } catch (error) {
            setError(error);
        }
    };

    const filteredOrders = orders.filter(order =>
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="OrderRetrieveContainer">
            <MenuNav />
            <div className="header1" style={{ textAlign: "center", color: "red", position: "sticky", top: "0", zIndex: "1000", backgroundColor: "#fff" }}>
                <h1>Order List</h1>
                <input
    type="text"
    placeholder="Search by Order ID"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{
        margin: '10px',
        padding: '8px 10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        fontSize: '16px',
        width: '300px',
    }}
/>

            </div>
            <div className="OrderPageContainer">
                <div className="OrderListContainer">
                    <div className="OrderList">
                        {isLoading ? (
                            <p className="LoadingMessage">Loading...</p>
                        ) : error ? (
                            <p className="ErrorMessage">Error: {error.message}</p>
                        ) : (
                            filteredOrders.map(order => (
                                <div key={order._id} className="OrderItem">
                                    <p>Order ID: {order.orderId}</p>
                                    <p>Customer ID: {order.customerId}</p>
                                    <p>Date: {order.date}</p>
                                    <p>Items: {order.ItemName}</p> 
                                    <p>Total Amount: {order.TotalAmount}</p>
                                    <button onClick={() => handleDeleteOrder(order._id)} style={{ color: 'white', marginLeft: '500px', border: '2', background: '#FD204F', cursor: 'pointer' }}>Delete</button>
                                    <button onClick={() => handleEditOrder(order)} style={{ color: 'white', marginLeft: '10px', border: '2', background: '#FD204F', cursor: 'pointer' }}>Edit</button>

                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="OrderEditFormContainer">
                    {editOrder && (
                        <OrderEditForm order={editOrder} onUpdate={handleUpdateOrder} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderRetrieve;
