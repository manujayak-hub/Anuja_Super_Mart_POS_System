import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useInventoryStore from '../../stores/inventoryStore';
import Sidebar from '../../components/InventoryComponents/InvSideBar';

const InventoryDash = () => {
    const { inventory, setInventory, setError ,removeInventory} = useInventoryStore();

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('/inventory');
                setInventory(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchInventory();
    }, [setInventory, setError]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/inventory/${id}`);
            removeInventory(id); 
        } catch (error) {
            console.error('Error deleting inventory item:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 sidenav">
                    <Sidebar />
                </div>
                <div className="col-sm-10">
                    <h1>Inventory List</h1>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>prodId</th> 
                                    <th>Name</th>
                                    <th>wPrice</th>
                                    <th>rPrice</th>
                                    <th>InStock</th>
                                    <th>category</th>
                                    <th>supplierId</th>
                                    <th>MFDate</th>
                                    <th>EXPDate</th>
                                    <th>imageUrl</th>
                                    <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.length > 0 ? (
                                    inventory.map(item => (
                                        <tr key={item._id}>
                                            <td>{item.productId}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.wholesalePrice}</td>
                                            <td>{item.retailPrice}</td>
                                            <td>{item.quantityInStock}</td>
                                            <td>{item.category}</td>
                                            <td>{item.supplierId}</td>
                                            <td>{item.manufactureDate}</td>
                                            <td>{item.expireDate}</td>
                                            <td>{item.imageUrl}</td>
                                            <td>
                                                <button onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete</button>
                                            </td> 
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11">No inventory items found.</td> 
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryDash;
