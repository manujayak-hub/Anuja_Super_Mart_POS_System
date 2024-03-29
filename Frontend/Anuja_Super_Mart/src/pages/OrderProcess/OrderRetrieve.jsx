import React, { useState, useEffect } from "react";
import MenuNav from "../../components/OrderProcess/MenuNavbar";
import ProductUpdateForm from "../../components/OrderProcess/ProductUpdateForm"; 
import useOrderStore from "../../stores/useOrderStore";
import axios from '../../api/axios';
import "./OrderRetrieve.scss";

const OrderRetrieve = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { orders, error, setOrders, removeOrder, updateOrder } = useOrderStore();

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
        try {
            await axios.delete(`/order/${orderId}`);
            removeOrder(orderId);
        } catch (error) {
            setError(error);
        }
    };

    const handleUpdateOrder = async (updatedOrder) => {
        try {
            await axios.put(`/order/${updatedOrder._id}`, updatedOrder);
            updateOrder(updatedOrder);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="OrderRetrieveContainer">
            <MenuNav />
            <div className="Header">
                <h1>Order Retrieve</h1>
            </div>
            <div className="OrderPageContainer">
                <div className="OrderList">
                    {isLoading ? (
                        <p className="LoadingMessage">Loading...</p>
                    ) : error ? (
                        <p className="ErrorMessage">Error: {error.message}</p>
                    ) : (
                        <>
                            {orders.map(order => (
                                <div key={order._id} className="OrderItem">
                                    <p>Order ID: {order.orderId}</p>
                                    <p>Customer ID: {order.customerId}</p>
                                    <p>Total Amount: {order.TotalAmount}</p>
                                    <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                                    <button onClick={() => handleUpdateOrder(order)}>Edit</button>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className="ProductUpdateContainer">
                    <ProductUpdateForm />
                </div>
            </div>
        </div>
    );
};

export default OrderRetrieve;
