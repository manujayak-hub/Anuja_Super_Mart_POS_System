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

    return (
        <div className="OrderRetrieveContainer">
            <MenuNav />
            <div className="header1" style={{ textAlign: "center", color: "red" }}>
                <h1>Order List</h1>
            </div>
            <div className="OrderPageContainer">
                <div className="OrderListContainer">
                    <div className="OrderList">
                        {isLoading ? (
                            <p className="LoadingMessage">Loading...</p>
                        ) : error ? (
                            <p className="ErrorMessage">Error: {error.message}</p>
                        ) : (
                            orders.map(order => (
                                <div key={order._id} className="OrderItem">
                                    <p>Order ID: {order.orderId}</p>
                                    <p>Customer ID: {order.customerId}</p>
                                    <p>Date: {order.date}</p>
                                    <p>Items: {order.ItemName}</p> {/* Display item names */}
                                    <p>Total Amount: {order.TotalAmount}</p>
                                    <button onClick={() => handleDeleteOrder(order._id)} style={{  color: 'red', marginLeft:'500px' }}>Delete</button>
                                    <button onClick={() => handleEditOrder(order)} style={{  color: 'red', marginLeft:'10px' }}>Edit</button>

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
