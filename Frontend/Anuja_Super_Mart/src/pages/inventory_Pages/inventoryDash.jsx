import React, { useEffect } from 'react';
import axios from '../../api/axios';
import useInventoryStore from '../../stores/inventoryStore';

const inventoryDash = () => {
    const { inventory, setInventory, setError } = useInventoryStore();

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('/inventory'); // Adjust the endpoint according to your API
                setInventory(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchInventory();

        // Clean-up function to avoid memory leaks
        return () => {
            // Cleanup code here, if needed
        };
    }, [setInventory, setError]); // Dependency array to ensure the effect runs only once



    return (
        <>
            <div>
                <h1>Inventory List</h1>
                {inventory.length > 0 ? (
                    <ul>
                        {inventory.map(item => (
                            <li key={item._id}>
                                {item.productName} - {item.quantityInStock}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No inventory items found.</p>
                )}
            </div>


        </>
    );
}

export default inventoryDash;
