import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import useInventoryStore from '../../stores/inventoryStore';
import Sidebar from '../../components/InventoryComponents/InvSideBar';
import InvSupNav from '../../components/InventoryComponents/invSupNav';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS

import '../../styles/additem.scss'


const AddItem = () => {
    const [showPopup, setShowPopup] = useState(false); // State for showing/hiding the popup
    const [popupMessage, setPopupMessage] = useState(''); // State for the popup message

    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupMessage('');
    };

    // Define formik form values, validation schema, and submit function
    const formik = useFormik({
        initialValues: {
            productId: '',
            productName: '',
            wholesalePrice: '',
            retailPrice: '',
            quantityInStock: '',
            category: '',
            supplierId: '',
            manufactureDate: null,
            expireDate: null,
            imageUrl: '',
        },
        validationSchema: Yup.object({
            productId: Yup.string().required('Required'),
            productName: Yup.string().required('Required'),
            wholesalePrice: Yup.number().required('Required'),
            retailPrice: Yup.number().required('Required'),
            quantityInStock: Yup.number().required('Required'),
            category: Yup.string().required('Required'),
            supplierId: Yup.string().required('Required'),
            manufactureDate: Yup.date().required('Required'),
            expireDate: Yup.date().required('Required'),
            imageUrl: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await axios.post('/inventory', values);
                useInventoryStore.getState().addInventory(response.data);
                resetForm();
                setPopupMessage('Item added successfully.');
                setShowPopup(true);
            } catch (error) {
                console.error('Error adding inventory:', error);
                setPopupMessage('Failed to add item.');
                setShowPopup(true);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            <div className="add-item-container bg-light">
                <div className="row">
                    <div className="col-sm-2">
                        <Sidebar />
                    </div>
                    <div className="col-sm-10">
                        <InvSupNav />
                        <h1 style={{ color: 'red', textAlign: 'center' }}>Add Products</h1>

                        {showPopup && (
                            <div className="popup" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '9999', borderRadius: '5px', padding: '20px' }}>
                                <div className="popup-inner">
                                    <button className="close-btn" onClick={handleClosePopup} style={{ position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'transparent', fontSize: '20px', color: '#fff', cursor: 'pointer' }}>
                                        &times;
                                    </button>
                                    <p style={{ color: '#fff' }}>{popupMessage}</p>
                                </div>
                            </div>
                        )}


                        {/* Formik form */}
                        <form onSubmit={formik.handleSubmit} className="add-item-form p-3">
                            {/* Input fields for inventory item */}
                            <div className="mb-3">
                                <label htmlFor="productId" className="form-label">Product ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productId"
                                    name="productId"
                                    value={formik.values.productId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {/* Error message for productId */}
                                {formik.touched.productId && formik.errors.productId ? (
                                    <div className="text-danger">{formik.errors.productId}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    name="productName"
                                    value={formik.values.productName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.productName && formik.errors.productName ? (
                                    <div className="text-danger">{formik.errors.productName}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="wholesalePrice" className="form-label">Whole Sale Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="wholesalePrice"
                                    name="wholesalePrice"
                                    value={formik.values.wholesalePrice}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.wholesalePrice && formik.errors.wholesalePrice ? (
                                    <div className="text-danger">{formik.errors.wholesalePrice}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="retailPrice" className="form-label">Retail Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="retailPrice"
                                    name="retailPrice"
                                    value={formik.values.retailPrice}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.retailPrice && formik.errors.retailPrice ? (
                                    <div className="text-danger">{formik.errors.retailPrice}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="quantityInStock" className="form-label">Quantity In Stock</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="quantityInStock"
                                    name="quantityInStock"
                                    value={formik.values.quantityInStock}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.quantityInStock && formik.errors.quantityInStock ? (
                                    <div className="text-danger">{formik.errors.quantityInStock}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    id="category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="Baby_products">Baby Products</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Dairy_products">Diary Products</option>
                                    <option value="PersonalCare">Personal Care</option>
                                    <option value="Cooking_Essential">Cooking Essential</option>
                                    <option value="Snacks">Snacks</option>
                                    <option value="Other">Other</option>
                                </select>
                                {formik.touched.category && formik.errors.category ? (
                                    <div className="text-danger">{formik.errors.category}</div>
                                ) : null}
                            </div>


                            <div className="mb-3">
                                <label htmlFor="supplierId" className="form-label">SupplierID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="supplierId"
                                    name="supplierId"
                                    value={formik.values.supplierId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.supplierId && formik.errors.supplierId ? (
                                    <div className="text-danger">{formik.errors.supplierId}</div>
                                ) : null}
                            </div>

                            <div className="row">
                                <div className="col-sm-6 mb-3">
                                    <label htmlFor="manufactureDate" className="form-label">Manufacture Date</label>
                                    <DatePicker
                                        className="form-control"
                                        id="manufactureDate"
                                        name="manufactureDate"
                                        selected={formik.values.manufactureDate}
                                        onChange={(date) => formik.setFieldValue('manufactureDate', date)}
                                        onBlur={formik.handleBlur}
                                        dateFormat="MM/dd/yyyy" // Customize date format if needed
                                    />
                                    {formik.touched.manufactureDate && formik.errors.manufactureDate ? (
                                        <div className="text-danger">{formik.errors.manufactureDate}</div>
                                    ) : null}
                                </div>

                                <div className="col-sm-6 mb-3">
                                    <label htmlFor="expireDate" className="form-label">Expire Date</label>
                                    <DatePicker
                                        className="form-control"
                                        id="expireDate"
                                        name="expireDate"
                                        selected={formik.values.expireDate}
                                        onChange={(date) => formik.setFieldValue('expireDate', date)}
                                        onBlur={formik.handleBlur}
                                        dateFormat="MM/dd/yyyy" // Customize date format if needed
                                    />
                                    {formik.touched.expireDate && formik.errors.expireDate ? (
                                        <div className="text-danger">{formik.errors.expireDate}</div>
                                    ) : null}
                                </div>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="imageUrl" className="form-label">imageUrl</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formik.values.imageUrl}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.imageUrl && formik.errors.imageUrl ? (
                                    <div className="text-danger">{formik.errors.imageUrl}</div>
                                ) : null}
                            </div>


                            <center>
                                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Submit</button>
                            </center>
                        </form>
                        <div className="col-sm-2 ">
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AddItem;
