import Inventory from '../models/inventory_model';
import mongoose from 'mongoose';

const createInventory = async (req, res) => {
    const {
        productId,
        productName,
        wholesalePrice,
        retailPrice,
        quantityInStock,
        category,
        supplierId,
        manufactureDate,
        expireDate,
        imageUrl
    } = req.body;

    try {
        const INV = await Inventory.create({
            productId,
            productName,
            wholesalePrice,
            retailPrice,
            quantityInStock,
            category,
            supplierId,
            manufactureDate,
            expireDate,
            imageUrl
        });
        res.status(201).json(INV); // 201 for resource created successfully
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getallinventory = async (req, res) => {
    try {
        const INV = await Inventory.find({});
        res.status(200).json(INV);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getbyIdInventory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const INV = await Inventory.findById(id);

        if (!INV) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(INV);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const updateInventory = async (req, res) => {
    const { id } = req.params;
    const {
        productId,
        productName,
        wholesalePrice,
        retailPrice,
        quantityInStock,
        category,
        supplierId,
        manufactureDate,
        expireDate,
        imageUrl
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const INV = await Inventory.findOneAndUpdate({ _id: id }, {
            productId,
            productName,
            wholesalePrice,
            retailPrice,
            quantityInStock,
            category,
            supplierId,
            manufactureDate,
            expireDate,
            imageUrl
        }, { new: true });

        if (!INV) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(INV);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const deleteInventory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const deletedInv = await Inventory.findOneAndDelete({ _id: id });

        if (!deletedInv) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(deletedInv);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const findInventoryByCategory = async (req, res) => {
    const { categoryName } = req.params;

    try {
        const inventoryByCategory = await Inventory.find({ category: categoryName });

        res.status(200).json(inventoryByCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const findInventoryByProductId = async (req, res) => {
    const { productId } = req.params;

    try {
        const inventoryByProductId = await Inventory.findOne({ productId });

        if (!inventoryByProductId) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(inventoryByProductId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const findInventoryByName = async (req, res) => {
    const { itemName } = req.params;

    try {
        const inventoryByName = await Inventory.find({ productName: itemName });

        res.status(200).json(inventoryByName);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports = { createInventory, deleteInventory, updateInventory, getallinventory, getbyIdInventory,findInventoryByName, findInventoryByProductId, findInventoryByCategory };
