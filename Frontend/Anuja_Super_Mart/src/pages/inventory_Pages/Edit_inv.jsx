import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useInventoryStore from '../../stores/inventoryStore';
import Sidebar from '../../components/InventoryComponents/InvSideBar'
import InvSupNav from '../../components/InventoryComponents/invSupNav'
import UpdateForm from '../../components/InventoryComponents/Updateform'; // Import the UpdateForm component
import searchicon from '../../assets/inventory/icons8-search-50.png'
import crossicon from '../../assets/inventory/icons8-cross-50.png'
import { Pagination, Modal, Button } from 'react-bootstrap';

const EditInv = () => {
    const { inventory, setError, setInventory } = useInventoryStore();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Function to handle selecting a product ID
    const displayUpdateForm = (productId) => {
        setSelectedProductId(productId);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const fetchInventory = async () => {
        try {
            const response = await axios.get('/inventory');
            setInventory(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Effect to fetch inventory data
    useEffect(() => {
        fetchInventory();
    }, [setInventory, setError]);

    // Effect to update selected item when selectedProductId changes
    useEffect(() => {
        if (selectedProductId) {
            const selectedItem = inventory.find(item => item.productId === selectedProductId);
            setSelectedItem(selectedItem);
        } else {
            setSelectedItem(null);
        }
    }, [selectedProductId, inventory]);

    // Function to handle update form submission
    const handleUpdate = async (updatedItem) => {
        try {
            // Make API request to update inventory item
            await axios.patch(`/inventory/${updatedItem._id}`, updatedItem);
            // Refresh inventory data after update
            const response = await axios.get('/inventory');
            setInventory(response.data);
            // Clear selected product ID
            setSelectedProductId(null);
            setShowUpdateModal(false);
        } catch (error) {
            console.error('Error updating inventory item:', error);
        }
    };

    const handleSearch = async () => {
        if (searchQuery.trim() !== '') {
            try {
                // Fetch all inventory items
                const response = await axios.get('/inventory');
                const allInventory = response.data;

                // Filter inventory items locally based on the search query
                const filteredInventory = allInventory.filter(item =>
                    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setInventory(filteredInventory);
            } catch (error) {
                setError(error.message);
            }
        } else {
            fetchInventory(); // If search query is empty, fetch all inventory items
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        fetchInventory(); // Reset search and fetch all inventory items
    };

    // Logic to calculate current items based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 sidenav">
                    <Sidebar />
                </div>
                <div className="col-sm-10">
                    <h1>Inventory List</h1>
                    <InvSupNav/>
                    <div className="search-bar col-sm-8">
                        <input
                            type="text"
                            placeholder="Search by product name"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <a onClick={handleSearch} className="icon-container">
                            <img src={searchicon} className="img-fluid icon" alt="Search Icon" />
                        </a>
                        {/* Clear search icon */}
                        <a onClick={handleClearSearch} className="icon-container">
                            <img src={crossicon} className="img-fluid icon" alt="Cross Icon" />
                        </a>
                    </div>
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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map(item => (
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
                                            <td> <button onClick={() => displayUpdateForm(item.productId)}>Update</button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No inventory items found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <Pagination>
                        {inventory.length > 0 && (
                            Array.from({ length: Math.ceil(inventory.length / itemsPerPage) }).map((_, index) => (
                                <Pagination.Item key={index + 1} onClick={() => paginate(index + 1)} active={index + 1 === currentPage}>
                                    {index + 1}
                                </Pagination.Item>
                            ))
                        )}
                    </Pagination>
                    {/* Update Modal */}
                    <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedItem && <UpdateForm initialValues={selectedItem} onSubmit={handleUpdate} />}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseUpdateModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default EditInv;
