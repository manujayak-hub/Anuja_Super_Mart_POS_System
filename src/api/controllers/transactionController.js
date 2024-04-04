const Transactions = require('../models/TransactionModel').Transactions;
const TypeTotal = require('../models/TransactionModel').TypeTotal;
const mongoose = require('mongoose');

const resetTypeTotal = async (req, res) => {
    try {
        // Update all documents in the TypeTotal collection to set totalAmount to 0
        await TypeTotal.updateMany({}, { totalAmount: 0 });
        res.status(200).json({ message: 'Type total values reset successfully' });
    } catch (error) {
        console.error('Error resetting type total values:', error);
        res.status(500).json({ error: 'An error occurred while resetting type total values' });
    }
};

const getAllTypeTotals = async (req, res) => {
    try {
        // Retrieve all documents from the TypeTotal collection
        const typeTotals = await TypeTotal.find({});
        res.status(200).json(typeTotals);
    } catch (error) {
        console.error('Error retrieving type totals:', error);
        res.status(500).json({ error: 'An error occurred while retrieving type totals' });
    }
};

const createTransaction = async (req, res) => {
    const { transactionID, transactionDateTime, transactionType, transactionAmount, transactionMethod } = req.body;

    try {
        const transaction = await Transactions.create({ transactionID, transactionDateTime, transactionType, transactionAmount, transactionMethod });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: 'Server Error' });
    }
}

const getallTransactions = async (req, res) => {
    try {
        const transaction = await Transactions.find({});
        res.status(200).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}

const getbyIdTransaction = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID Format' });
    }

    try {
        const transaction = await Transactions.findById(id);

        if (!transaction) {
            return res.status(404).json({ error: 'No such transaction' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { transactionID, transactionDateTime, transactionType, transactionAmount, transactionMethod } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const transaction = await Transactions.findOneAndUpdate({ _id: id },
            { transactionID, transactionDateTime, transactionType, transactionAmount, transactionMethod },
            { new: true });

        if (!transaction) {
            return res.status(400).json({ error: 'No such transaction' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const deletedTransaction = await Transactions.findOneAndDelete({ _id: id });

        if (!deletedTransaction) {
            return res.status(404).json({ error: 'No such transaction' });
        }

        res.status(200).json(deletedTransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const saveTypeTotal = async (req, res) => {
    const { type, totalAmounts } = req.body;

    // Ensure totalAmounts is an object
    if (typeof totalAmounts !== 'object') {
        return res.status(400).json({ error: 'totalAmounts must be an object' });
    }

    try {
        // Iterate over each type in totalAmounts and save/update the corresponding TypeTotal document
        for (const typeKey in totalAmounts) {
            if (Object.hasOwnProperty.call(totalAmounts, typeKey)) {
                const amount = totalAmounts[typeKey];

                // Check if amount is a valid number
                if (isNaN(amount)) {
                    return res.status(400).json({ error: 'totalAmount must be a valid number' });
                }

                let typeTotal = await TypeTotal.findOne({ type: typeKey });

                if (!typeTotal) {
                    typeTotal = new TypeTotal({ type: typeKey, totalAmount: amount });
                } else {
                    typeTotal.totalAmount += parseFloat(amount); // Ensure amount is parsed as a float
                }

                await typeTotal.save();
            }
        }

        res.status(201).json({ message: 'Type totals saved successfully' });
    } catch (error) {
        console.error('Error saving type totals:', error);
        res.status(500).json({ error: 'An error occurred while saving type totals' });
    }
};

module.exports = {getAllTypeTotals ,resetTypeTotal,  createTransaction, getallTransactions, getbyIdTransaction, updateTransaction, deleteTransaction, saveTypeTotal };
