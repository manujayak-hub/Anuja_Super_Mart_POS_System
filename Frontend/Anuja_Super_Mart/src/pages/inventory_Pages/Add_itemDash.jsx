import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import useInventoryStore from '../../stores/inventoryStore';
import Sidebar from '../../components/InventoryComponents/InvSideBar'

const AddItem = () => {
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
            manufactureDate: '',
            expireDate: '',
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
                // Make API request to add inventory
                const response = await axios.post('/inventory', values);

                // Update inventory store with new item
                useInventoryStore.getState().addInventory(response.data);

                // Reset form after successful submission
                resetForm();
            } catch (error) {
                console.error('Error adding inventory:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>


            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 sidenav">
                        <Sidebar />
                    </div>
                    <div className="col-sm-2 ">
                    </div>
                    <div className="col-sm-6">
                    <h1>Add Products</h1>
                        {/* Formik form */}
                        <form onSubmit={formik.handleSubmit} className="p-3">
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
                                <input
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
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

                            <div className="mb-3">
                                <label htmlFor="manufactureDate" className="form-label">manufactureDate</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="manufactureDate"
                                    name="manufactureDate"
                                    value={formik.values.manufactureDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.manufactureDate && formik.errors.manufactureDate ? (
                                    <div className="text-danger">{formik.errors.manufactureDate}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="expireDate" className="form-label">expireDate</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="expireDate"
                                    name="expireDate"
                                    value={formik.values.expireDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.expireDate && formik.errors.expireDate ? (
                                    <div className="text-danger">{formik.errors.expireDate}</div>
                                ) : null}
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


                            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Submit</button>
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
