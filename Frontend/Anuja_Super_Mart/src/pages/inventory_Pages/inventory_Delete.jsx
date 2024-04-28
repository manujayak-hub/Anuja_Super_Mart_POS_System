import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useInventoryStore from '../../stores/inventoryStore';
import Sidebar from '../../components/InventoryComponents/InvSideBar';
import InvSupNav from '../../components/InventoryComponents/invSupNav';
import crossicon from '../../assets/inventory/icons8-cross-50.png'
import { Pagination, Modal, Button, Table } from 'react-bootstrap';
import '../../styles/inventorydelete.scss';

const InventoryDelete = () => {
    const { inventory, setInventory, setError, removeInventory } = useInventoryStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('/inventory');
            setInventory(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        setFilteredInventory(inventory);
    }, [inventory]);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() !== '') {
            const filtered = inventory.filter(item =>
                item.productName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredInventory(filtered);
        } else {
            setFilteredInventory(inventory);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setFilteredInventory(inventory);
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteConfirmation = (id) => {
        setSelectedProductId(id);
        setShowConfirmationModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`/inventory/${selectedProductId}`);
            removeInventory(selectedProductId);
            setShowConfirmationModal(false);
            fetchInventory(); // Refresh inventory data after deletion
        } catch (error) {
            console.error('Error deleting inventory item:', error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container-fluid bg-light">
            <div className="row">
                <div className="col-sm-2 sidenav">
                    <Sidebar />
                </div>
                <div className="col-sm-10">
                    <InvSupNav />
                    <h1>Delete Inventory Products</h1>
                    <div className="search-bar col-sm-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by product name"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <div className="input-group-append">
                                <a onClick={handleClearSearch} className="icon-container">
                                    <img src={crossicon} className="img-fluid icon" alt="Cross Icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>prodId</th>
                                    <th style={{ width: '20%' }} >Name</th>
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
                                            <td>
                                                <Button variant="danger" size="sm" onClick={() => handleDeleteConfirmation(item._id)}>Delete</Button> {/* Small red button for Delete */}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11">No inventory items found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                    <Pagination>
                        {filteredInventory.length > 0 && (
                            Array.from({ length: Math.ceil(filteredInventory.length / itemsPerPage) }).map((_, index) => (
                                <Pagination.Item key={index + 1} onClick={() => handlePagination(index + 1)} active={index + 1 === currentPage}>
                                    {index + 1}
                                </Pagination.Item>
                            ))
                        )}
                    </Pagination>
                    {/* Confirmation Modal */}
                    <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this item?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleConfirmDelete}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default InventoryDelete;
