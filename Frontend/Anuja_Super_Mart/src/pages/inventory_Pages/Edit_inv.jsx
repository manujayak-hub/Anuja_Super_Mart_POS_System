import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useInventoryStore from '../../stores/inventoryStore';
import Sidebar from '../../components/InventoryComponents/InvSideBar';
import InvSupNav from '../../components/InventoryComponents/invSupNav';
import UpdateForm from '../../components/InventoryComponents/Updateform';
import crossicon from '../../assets/inventory/icons8-cross-50.png';
import { Pagination, Modal, Button, Table } from 'react-bootstrap';
import '../../styles/EditInv.scss';

const EditInv = () => {
    const { inventory, setError, setInventory } = useInventoryStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('/inventory');
            setInventory(response.data);
            setFilteredInventory(response.data); // Initialize filtered inventory with all items
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setCurrentPage(1); // Reset current page when search query changes
        filterInventory(query);
    };

    const filterInventory = (query) => {
        const filtered = inventory.filter(item =>
            item.productName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredInventory(filtered);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setCurrentPage(1); // Reset current page when search is cleared
        setFilteredInventory(inventory); // Reset filtered inventory to all items
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDisplayUpdateForm = (productId) => {
        setSelectedProductId(productId);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleUpdate = async (updatedItem) => {
        try {
            await axios.patch(`/inventory/${updatedItem._id}`, updatedItem);
            fetchInventory(); // Refresh inventory data
            setShowUpdateModal(false);
        } catch (error) {
            console.error('Error updating inventory item:', error);
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
                    <InvSupNav/>
                    <h1>Change Inventory Details</h1>
                    <div className="search-bar col-sm-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by product name"
                                value={searchQuery}
                                onChange={handleSearchChange}
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
                                                <Button variant="danger" size="sm" className="mr-2" onClick={() => handleDisplayUpdateForm(item.productId)}>Update</Button> {/* Small red button for Update */}
                                              
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10">No inventory items found.</td>
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
                    <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedProductId && (
                                <UpdateForm
                                    initialValues={inventory.find(item => item.productId === selectedProductId)}
                                    onSubmit={handleUpdate}
                                />
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" size="sm" className="mr-2" onClick={handleCloseUpdateModal}>
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
