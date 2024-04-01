import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useInventoryStore from '../../stores/inventoryStore';
import Sidebar from '../../components/InventoryComponents/InvSideBar'
import InvSupNav from '../../components/InventoryComponents/invSupNav'
import searchicon from '../../assets/inventory/icons8-search-50.png'
import crossicon from '../../assets/inventory/icons8-cross-50.png'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const InventoryDash = () => {
    const { inventory, setInventory, setError, filterInventoryByName, filterInventoryByProductId } = useInventoryStore();
    const [totalValue, setTotalValue] = useState(0);
    const [expectedValue, setExpectedValue] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

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

    // Function to generate and download PDF report
    const generatePDF = () => {
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
                { text: 'Inventory Report', style: 'header' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', 50, 50, 50, '*', '*', 'auto', 'auto'], 
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
                    fontSize: 8,
                    bold: true,
                    alignment: 'left',
                    margin: [0, 0, 0, 10]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 8,
                    color: 'black'
                }
            }
        };
        

        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.download('Inventory_Report.pdf');
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 sidenav">
                        <Sidebar />
                    </div>
                    
                    <div className="col-sm-10">
                    <InvSupNav/>
                        <h1>Inventory List</h1>
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
                        <div>
                            <p>Total Stock Value Rs: {totalValue}</p>
                            <p>Expected Income Rs: {expectedValue}</p>
                            <button onClick={generatePDF}>Generate PDF Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InventoryDash;
