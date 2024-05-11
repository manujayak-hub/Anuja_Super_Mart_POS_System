import ssuplier from '../models/ssuplier_model';
import mongoose from 'mongoose';

const createSuplier = async (req, res) => {
    const { suplierName, suplierId, ProductName, ProductQuantity } = req.body;

    try {
        // Validate request body fields
        if (!suplierName || !suplierId || !ProductName || !ProductQuantity) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create supplier
        const suplier = await ssuplier.create({ suplierName, suplierId, ProductName, ProductQuantity });
        res.status(200).json({ message: 'Supplier created successfully', data: suplier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create supplier' });
    }
};

const getallSuplier = async (req, res) => {
    try {
        const suplier = await ssuplier.find({});
        res.status(200).json({ data: suplier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve suppliers' });
    }
};

const getbyIdSuplier = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID format' });
    }

    try {
        const suplier = await ssuplier.findById(id);

        if (!suplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.status(200).json({ data: suplier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve supplier' });
    }
};

const updateSuplier = async (req, res) => {
    const { id } = req.params;
    const { suplierName, suplierId, ProductName, ProductQuantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const suplier = await ssuplier.findOneAndUpdate(
            { _id: id },
            { suplierName, suplierId, ProductName, ProductQuantity },
            { new: true }
        );

        if (!suplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier updated successfully', data: suplier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update supplier' });
    }
};

const deleteSuplier = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const deletedSuplier = await ssuplier.findOneAndDelete({ _id: id });

        if (!deletedSuplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete supplier' });
    }
};

module.exports = { createSuplier, getallSuplier, getbyIdSuplier, updateSuplier, deleteSuplier };
