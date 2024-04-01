import React, { useState, useEffect } from "react";
import MenuNav from "../../components/OrderProcess/MenuNavbar";
import './List.scss';

function List() {
    const [inventory, setInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInventory = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/inventory'); // Corrected URL
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setInventory(data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <>
            <MenuNav />
            <div>
                <h1>LIST</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ProductID</th>
                                <th>Product Name</th>
                                <th>Wholesale Price</th>
                                <th>Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((inventory, index) => (
                                <tr key={index}>
                                    <td>{inventory.productId}</td>
                                    <td>{inventory.productName}</td>
                                    <td>{inventory.wholesalePrice}</td>
                                    <td>{inventory.quantityInStock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default List;
