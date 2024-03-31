import React, { useState } from 'react';
import axios from '../../api/axios';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateTransaction = ({ transaction, onUpdate }) => {
    const [updatedTransaction, setUpdatedTransaction] = useState(transaction);
    const [showModal, setShowModal] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTransaction({
            ...updatedTransaction,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/transactions/${updatedTransaction._id}`, updatedTransaction);
            onUpdate(updatedTransaction);
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
            <Modal.Header closeButton className="bg-danger text-white">
                <Modal.Title>Update Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
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
                        <Form.Control type="text" name="transactionType" value={updatedTransaction.transactionType} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formAmount">
                        <Form.Label>Amount:</Form.Label>
                        <Form.Control type="text" name="transactionAmount" value={updatedTransaction.transactionAmount} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formMethod">
                        <Form.Label>Method:</Form.Label>
                        <Form.Control type="text" name="transactionMethod" value={updatedTransaction.transactionMethod} onChange={handleInputChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="bg-danger">
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                <Button variant="light" onClick={handleSubmit}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateTransaction;
