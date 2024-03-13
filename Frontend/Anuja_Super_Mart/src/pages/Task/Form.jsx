import React from 'react';
import './Form.css';

const SupplierManagementForm = () => {
    return (
        <div className="container">
            <h2>Supplier Management Form</h2>
            <form action="#" method="post">
                <label htmlFor="supplierName">Supplier Name:</label>
                <input type="text" id="supplierName" name="supplierName" required /><br />

                <label htmlFor="supplierId">Supplier ID:</label>
                <input type="text" id="supplierId" name="supplierId" required /><br />

                <label htmlFor="productName">Product Name:</label>
                <input type="text" id="productName" name="productName" required /><br />

                <label htmlFor="quantity">Quantity of Product:</label>
                <input type="number" id="quantity" name="quantity" required /><br />

                <label htmlFor="timePeriod">Time Period:</label>
                <input type="date" id="timePeriod" name="timePeriod" required /><br />

                <label htmlFor="advantages">Give advantage for business:</label>
                <input type="text" id="advantages" name="advantages" required /><br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default SupplierManagementForm;
