import express from "express";

const transactionRouter = express.Router();

const {
    createTransaction,
    getallTransactions,
    getbyIdTransaction,
    deleteTransaction,
    updateTransaction,
    saveTypeTotal,
    resetTypeTotal,
    getAllTypeTotals
} = require('../controllers/transactionController');

// Get all transactions  
transactionRouter.get('/', getallTransactions);

// Get a single transaction
transactionRouter.get('/:id', getbyIdTransaction);

// Post a new transaction
transactionRouter.post('/', createTransaction);

// Delete a transaction
transactionRouter.delete('/:id', deleteTransaction);

// Update a transaction
transactionRouter.patch('/:id', updateTransaction);

// Save type and total - Define a unique endpoint, for example '/save-type-total'
transactionRouter.post('/save-type-total', saveTypeTotal);

transactionRouter.post('/reset-type-total', resetTypeTotal);

transactionRouter.post('/get-type-total', getAllTypeTotals);

module.exports = transactionRouter;
