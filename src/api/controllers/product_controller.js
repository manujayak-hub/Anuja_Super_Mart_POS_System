import product from '../models/product_model';
import mongoose from 'mongoose';

const createproduct = async (req, res) => {
    const {
        productId,
        productName,
        productPrice,
        productDiscription,
        quantityInStock,
        discount,
        expireDate,
        imageUrl
    } = req.body;

    try {
        const prod = await product.create({
            productId,
            productName,
            productPrice,
            productDiscription,
            quantityInStock,
            discount,
            expireDate,
            imageUrl
        });
        res.status(201).json(prod); // 201 for resource created successfully
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getallproduct = async (req, res) => {
    try {
        const prod = await product.find({});
        res.status(200).json(prod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getbyIdproduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'invalid ID Format' });
    }

    try {
        const prod = await product.findById(id);

        if (!prod) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(prod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const updateproduct = async (req, res) => {
    const { id } = req.params;
    const {
        productId,
        productName,
        productPrice,
        productDiscription,
        quantityInStock,
        discount,
        expireDate,
        imageUrl
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'invalid ID Format' });
    }

    try {
        const prod = await product.findOneAndUpdate({ _id: id }, {
            productId,
            productName,
            productPrice,
            productDiscription,
            quantityInStock,
            discount,
            expireDate,
            imageUrl
        }, { new: true });

        if (!prod) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(prod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const deleteproduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'invalid ID format' });
    }

    try {
        const deletedprod = await product.findOneAndDelete({ _id: id });

        if (!deletedprod) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(deletedprod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { createproduct, getallproduct, getbyIdproduct, updateproduct, deleteproduct };
