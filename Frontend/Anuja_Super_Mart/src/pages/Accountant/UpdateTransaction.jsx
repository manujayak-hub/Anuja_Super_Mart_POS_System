import React, { useState } from 'react';
import axios from '../../api/axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const UpdateTransaction = ({ transaction, onUpdate }) => {
    const [showModal, setShowModal] = useState(true);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
            <Modal.Header closeButton className="bg-danger text-white">
                <Modal.Title>Update Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
                <Formik
                    initialValues={{
                        transactionType: transaction.transactionType,
                        transactionAmount: transaction.transactionAmount,
                        transactionMethod: transaction.transactionMethod
                    }}
                    validationSchema={Yup.object().shape({
                        transactionType: Yup.string().required('Type is required'),
                        transactionAmount: Yup.number().required('Amount is required'),
                        transactionMethod: Yup.string().required('Method is required')
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await axios.patch(`/transactions/${transaction._id}`, values);
                            onUpdate(values);
                            handleCloseModal();
                        } catch (error) {
                            console.error('Error updating transaction:', error);
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formTransactionID">
                                <Form.Label>Transaction ID:</Form.Label>
                                <Form.Control type="text" value={transaction.transactionID} readOnly />
                            </Form.Group>
                            <Form.Group controlId="formDateTime">
                                <Form.Label>Date/Time:</Form.Label>
                                <Form.Control type="text" value={transaction.transactionDateTime} readOnly />
                            </Form.Group>
                            <Form.Group controlId="formType">
                                <Form.Label>Type:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="transactionType"
                                    value={values.transactionType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.transactionType && !!errors.transactionType}
                                >
                                    <option value="">Select Type</option>
                                    <option value="inventory">Inventory</option>
                                    <option value="sales">Sales</option>
                                    <option value="utility">Utility</option>
                                    <option value="salary">Salary</option>
                                    <option value="other expenses">Other expenses</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">{errors.transactionType}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formAmount">
                                <Form.Label>Amount:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="transactionAmount"
                                    value={values.transactionAmount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.transactionAmount && !!errors.transactionAmount}
                                />
                                <Form.Control.Feedback type="invalid">{errors.transactionAmount}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formMethod">
                                <Form.Label>Method:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="transactionMethod"
                                    value={values.transactionMethod}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.transactionMethod && !!errors.transactionMethod}
                                >
                                    <option value="">Select Method</option>
                                    <option value="cash">Cash</option>
                                    <option value="credit">Credit</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">{errors.transactionMethod}</Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="secondary" onClick={handleCloseModal} disabled={isSubmitting}>Close</Button>
                            <Button variant="light" type="submit" disabled={isSubmitting}>Update</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateTransaction;
