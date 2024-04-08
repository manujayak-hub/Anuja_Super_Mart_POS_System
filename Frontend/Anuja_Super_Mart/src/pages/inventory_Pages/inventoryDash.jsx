import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useInventoryStore from '../../stores/inventoryStore';
import Sidebar from '../../components/InventoryComponents/InvSideBar';
import InvSupNav from '../../components/InventoryComponents/invSupNav';
import crossicon from '../../assets/inventory/icons8-cross-50.png';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Table, Pagination, Button, Row, Col } from 'react-bootstrap';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import '../../styles/InventoryDash.scss'


const InventoryDash = () => {
    const { inventory, setInventory, setError } = useInventoryStore();
    const [totalValue, setTotalValue] = useState(0);
    const [expectedValue, setExpectedValue] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('/inventory');
            setInventory(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, [setInventory, setError]);


    useEffect(() => {
        let total = 0;
        let expected = 0;
        inventory.forEach(item => {
            total += item.wholesalePrice * item.quantityInStock;
            expected += item.retailPrice * item.quantityInStock;
        });
        setTotalValue(total);
        setExpectedValue(expected);
    }, [inventory]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        filterInventory(event.target.value);
    };

    const filterInventory = (query) => {
        const filteredInventory = inventory.filter(item =>
            item.productName.toLowerCase().includes(query.toLowerCase())
        );
        setInventory(filteredInventory);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        fetchInventory(); // Reset search and fetch all inventory items
    };

    // Function to generate and download PDF report
    const generatePDF = () => {
        // Use the entire inventory instead of just the currentItems
        const inventoryData = inventory.map(item => ({
            ProductId: item.productId,
            ProductName: item.productName,
            WholesalePrice: item.wholesalePrice,
            RetailPrice: item.retailPrice,
            QuantityInStock: item.quantityInStock,
            Category: item.category,
            SupplierId: item.supplierId,
            ManufactureDate: item.manufactureDate,
            ExpireDate: item.expireDate
        }));
    
        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'landscape',
            content: [
                {
                    text: 'Inventory Report',
                    style: 'header'
                },
                {
                    style: 'table',
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', 70, 70, 70, '*', '*', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'Product ID', style: 'tableHeader' },
                                { text: 'Product Name', style: 'tableHeader' },
                                { text: 'Wholesale Price', style: 'tableHeader' },
                                { text: 'Retail Price', style: 'tableHeader' },
                                { text: 'Quantity In Stock', style: 'tableHeader' },
                                { text: 'Category', style: 'tableHeader' },
                                { text: 'Supplier ID', style: 'tableHeader' },
                                { text: 'Manufacture Date', style: 'tableHeader' },
                                { text: 'Expire Date', style: 'tableHeader' },
                            ],
                            ...inventoryData.map(item => [
                                item.ProductId,
                                item.ProductName,
                                item.WholesalePrice,
                                item.RetailPrice,
                                item.QuantityInStock,
                                item.Category,
                                item.SupplierId,
                                item.ManufactureDate,
                                item.ExpireDate
                            ])
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 24,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 0, 0, 20] // Add more margin at the bottom for spacing
                },
                table: {
                    margin: [0, 5, 0, 15], // Add margin to the entire table for spacing
                },
                tableHeader: {
                    bold: true,
                    fontSize: 16,
                    color: 'black',
                    fillColor: '#f8f9fa', // Bootstrap table header background color
                    alignment: 'center'
                }
            }
        };
    
        // Create a PDF document
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    
        // Download the PDF with a given filename
        pdfDocGenerator.download('Inventory_Report.pdf');
    };
    

    return (
        <div className="container-fluid bg-light inventory-dash-container">
            <div className="container-fluid bg-light">
                <div className="row">
                    <div className="col-sm-2 sidenav">
                        <Sidebar />
                    </div>

                    <div className="col-sm-10 ">
                        <InvSupNav />
                        <center><h1>Inventory List</h1></center>
                        
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
                                        <th style={{ width: '20%' }}>Name</th>
                                        <th>wPrice</th>
                                        <th>rPrice</th>
                                        <th>InStock</th>
                                        <th>category</th>
                                        <th>supplierId</th>
                                        <th>MFDate</th>
                                        <th>EXPDate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map(item => (
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
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <Row className="align-items-center justify-content-between">
                            <Col md="auto">
                                <div className="values">
                                    <p>Total Stock Value Rs: {totalValue}</p>
                                    <p>Expected Income Rs: {expectedValue}</p>
                                </div>
                            </Col>
                            <Col md="auto">
                                <Button onClick={generatePDF} variant="primary">Generate PDF Report</Button>
                            </Col>
                            <Col md="auto">
                                <Pagination>
                                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                                    <Pagination.Item>{currentPage}</Pagination.Item>
                                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentItems.length < itemsPerPage} />
                                </Pagination>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InventoryDash;
