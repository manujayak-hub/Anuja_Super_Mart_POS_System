import React, { useState, useEffect } from "react";
import MenuNav from "../../components/OrderProcess/MenuNavbar";
import './List.scss';
import { Table } from 'react-bootstrap';

function List() {
    const [inventory, setInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInventory = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/inventory'); 
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
            <div className="list-container-custom">
                <div className="list-heading-custom" style={{textAlign:'center'}}><h1>LIST</h1></div>
                {isLoading ? (
                    <p className="loading-message-custom">Loading...</p>
                ) : (
                    <div className="table-container-custom">
                        <Table className="table-custom">
                            <thead>
                                <tr>
                                    <th className="th-custom">ProductID</th>
                                    <th className="th-custom">Product Name</th>
                                    <th className="th-custom">Wholesale Price</th>
                                    <th className="th-custom">Available</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((item, index) => (
                                    <tr key={index}>
                                        <td className="td-custom">{item.productId}</td>
                                        <td className="td-custom">{item.productName}</td>
                                        <td className="td-custom">{item.wholesalePrice}</td>
                                        <td className="td-custom">{item.quantityInStock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        </>
    );
}

export default List;
