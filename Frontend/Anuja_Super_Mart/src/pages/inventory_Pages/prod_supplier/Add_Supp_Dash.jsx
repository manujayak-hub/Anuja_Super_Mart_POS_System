import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useProdSupStore from '../../../stores/prodsupplierStore';
import InvSupSidebar from '../../../components/InventoryComponents/InvSideBarForSup';
import InvSupNav from '../../../components/InventoryComponents/invSupNav';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS
import '../../../styles/additem.scss'; // Import the shared styles

const AddSupplierForm = () => {
    const { createProdsup } = useProdSupStore();

    const [showPopup, setShowPopup] = useState(false); // State for showing/hiding the popup
    const [popupMessage, setPopupMessage] = useState(''); // State for the popup message

    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupMessage('');
    };

    const formik = useFormik({
        initialValues: {
            SupId: '',
            supname: '',
            Contactno: '',
            email: '',
            contsappname: '',
            supstatus: '',
            note: ''
        },
        validationSchema: Yup.object({
            SupId: Yup.string().required('Required'),
            supname: Yup.string().required('Required'),
            Contactno: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            supstatus: Yup.string().required('Required'),
            note: Yup.string()
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                // Make API request to add supplier
                await createProdsup(values);
                // Reset form after successful submission
                resetForm();
                setPopupMessage('Supplier added successfully.');
                setShowPopup(true);
            } catch (error) {
                console.error('Error adding supplier:', error);
                setPopupMessage('Failed to add supplier.');
                setShowPopup(true);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="add-item-container bg-light"> {/* Apply shared container class */}
            <div className="row">
                <div className="col-sm-2">
                    <InvSupSidebar />
                </div>
                <div className="col-sm-10">
                    <InvSupNav />
                    <h1 style={{ color: 'red', textAlign: 'center' }}>Add Supplier</h1>

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
                    <form onSubmit={formik.handleSubmit} className="add-item-form p-3"> {/* Apply shared form class */}
                        <div className="mb-3">
                            <label htmlFor="SupId" className="form-label">Supplier ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="SupId"
                                name="SupId"
                                value={formik.values.SupId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.SupId && formik.errors.SupId ? (
                                <div className="text-danger">{formik.errors.SupId}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="supname" className="form-label">Supplier Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="supname"
                                name="supname"
                                value={formik.values.supname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.supname && formik.errors.supname ? (
                                <div className="text-danger">{formik.errors.supname}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Contactno" className="form-label">Contact No</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Contactno"
                                name="Contactno"
                                value={formik.values.Contactno}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.Contactno && formik.errors.Contactno ? (
                                <div className="text-danger">{formik.errors.Contactno}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Supplier Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-danger">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="contsappname" className="form-label">Contactable Person Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contsappname"
                                name="contsappname"
                                value={formik.values.contsappname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.contsappname && formik.errors.contsappname ? (
                                <div className="text-danger">{formik.errors.contsappname}</div>
                            ) : null}
                        </div>

                        <div className="row">
                            <label htmlFor="supstatus" className="form-label">Supplier Status</label>
                            <div className="col-sm-6 mb-3">
                                <input
                                    type="radio"
                                    id="active"
                                    name="supstatus"
                                    value="active"
                                    checked={formik.values.supstatus === 'active'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="active">Active</label>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <input
                                    type="radio"
                                    id="inactive"
                                    name="supstatus"
                                    value="inactive"
                                    checked={formik.values.supstatus === 'inactive'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="inactive">Inactive</label>
                            </div>
                            {formik.touched.supstatus && formik.errors.supstatus ? (
                                <div className="text-danger">{formik.errors.supstatus}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="note" className="form-label">Special Note</label>
                            <input
                                type="text"
                                className="form-control"
                                id="note"
                                name="note"
                                value={formik.values.note}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.note && formik.errors.note ? (
                                <div className="text-danger">{formik.errors.note}</div>
                            ) : null}
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Submit</button>
                    </form>
                    <div className="col-sm-2 "></div>
                </div>
            </div>
        </div>
    );
};

export default AddSupplierForm;
