import React, { useState } from "react";
import './OrderEditForm.scss';
import useOrderStore from "../../stores/useOrderStore"; 

const OrderEditForm = ({ order }) => {
    const [updatedOrder, setUpdatedOrder] = useState({ ...order });
    const [updateStatus, setUpdateStatus] = useState(null); 
    const updateOrder = useOrderStore(state => state.updateOrder); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedOrder({ ...updatedOrder, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateOrder(updatedOrder); 
            setUpdateStatus("success");
        } catch (error) {
            console.error("Error updating order:", error);
            setUpdateStatus("error");
        }9
    };

    return (
        <form className="OrderEditForm" onSubmit={handleSubmit}>
            <label>
                Order ID:
                <input type="text" name="orderId" value={updatedOrder.orderId} onChange={handleChange} required />
            </label>
            <label>
                Date:
                <input type="text" name="date" value={updatedOrder.date} onChange={handleChange} required />
            </label>
            <label>
                Items:
                <input type="text" name="ItemName" value={updatedOrder.ItemName} onChange={handleChange} required />
            </label>
            <label>
                Total Amount:
                <input type="text" name="TotalAmount" value={updatedOrder.TotalAmount|| ''} onChange={handleChange} required />
            </label>
            <button type="submit">Update</button>
            {/* Display update status message */}
            {updateStatus === "success" && <p>Update successful!</p>}
            {updateStatus === "error" && <p>Update unsuccessful. Please try again.</p>}
        </form>
    );
};

export default OrderEditForm;
