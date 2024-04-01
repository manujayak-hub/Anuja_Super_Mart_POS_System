import React, { useState } from "react";
import './OrderEditForm.scss';
import useOrderStore from "../../stores/useOrderStore"; // Import the useOrderStore

const OrderEditForm = ({ order }) => {
    const [updatedOrder, setUpdatedOrder] = useState({ ...order });
    const [updateStatus, setUpdateStatus] = useState(null); // State to track update status
    const updateOrder = useOrderStore(state => state.updateOrder); // Get the updateOrder method from the store

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedOrder({ ...updatedOrder, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateOrder(updatedOrder); // Call the updateOrder method from the store
            setUpdateStatus("success");
        } catch (error) {
            console.error("Error updating order:", error);
            setUpdateStatus("error");
        }
    };

    return (
        <form className="OrderEditForm" onSubmit={handleSubmit}>
            <label>
                Order ID:
                <input type="text" name="orderId" value={updatedOrder.orderId} onChange={handleChange} />
            </label>
            <label>
                Customer ID:
                <input type="text" name="customerId" value={updatedOrder.customerId} onChange={handleChange} />
            </label>
            <label>
                Total Amount:
                <input type="text" name="totalAmount" value={updatedOrder.totalAmount} onChange={handleChange} />
            </label>
            <button type="submit">Update</button>
            {/* Display update status message */}
            {updateStatus === "success" && <p>Update successful!</p>}
            {updateStatus === "error" && <p>Update unsuccessful. Please try again.</p>}
        </form>
    );
};

export default OrderEditForm;
