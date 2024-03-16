import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useInventoryStore from '../../stores/inventoryStore';

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
                const response = await axios.post('/api/inventory', values);

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
                {/* Repeat similar structure for other input fields */}
                {/* ... */}
                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Submit</button>
            </form>
        </>
    );
}

export default AddItem;
