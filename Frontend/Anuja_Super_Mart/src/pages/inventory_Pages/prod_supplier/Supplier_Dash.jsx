import React, { useEffect, useState } from 'react';
import useProdSupStore from '../../../stores/prodsupplierStore';
import InvSideBarForSup from '../../../components/InventoryComponents/InvSideBarForSup'
import InvSupNav from '../../../components/InventoryComponents/invSupNav';
import { Table, Pagination, Button, Row, Col } from 'react-bootstrap';
import crossicon from '../../../assets/inventory/icons8-cross-50.png'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const SupDash = () => {
    const { prodsupList, error, fetchAllProdsup } = useProdSupStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = prodsupList.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        fetchAllProdsup();
    }, [fetchAllProdsup]);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset pagination when search query changes
    };

    const filteredItems = prodsupList.filter(item =>
        item.supname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="container-fluid bg-light">
                <div className="row">
                    <div className="col-sm-2 sidenav">
                        <InvSideBarForSup />
                    </div>
                    
                    <div className="col-sm-10">
                        <InvSupNav />
                        <h1>Suppliers</h1>

                        <div className="search-bar col-sm-3">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by supplier name"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <div className="input-group-append">
                                    <a onClick={() => setSearchQuery('')} className="icon-container">
                                        <img src={crossicon} className="img-fluid icon" alt="Clear Icon" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ width: '8%' }} >SupId</th>
                                        <th style={{ width: '12%' }}>Name</th>
                                        <th style={{ width: '10%' }}>Contact No</th>
                                        <th style={{ width: '15%' }}>Email</th>
                                        <th style={{ width: '12%' }}>Contact Person Name</th>
                                        <th style={{ width: '10%' }}>Status</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map(item => (
                                            <tr key={item._id}>
                                                <td>{item.SupId}</td>
                                                <td>{item.supname}</td>
                                                <td>{item.Contactno}</td>
                                                <td>{item.email}</td>
                                                <td>{item.contsappname}</td>
                                                <td>{item.supstatus}</td>
                                                <td>{item.note}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7">No suppliers found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        <Row className="align-items-center justify-content-between">
                            <Col md="auto">
                                <Pagination>
                                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                                    <Pagination.Item>{currentPage}</Pagination.Item>
                                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentItems.length < itemsPerPage} />
                                </Pagination>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SupDash;
