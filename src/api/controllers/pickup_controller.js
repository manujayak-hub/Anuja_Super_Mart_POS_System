import Pickup from '../models/pickup_model';
import mongoose from 'mongoose';

const createPickup = async (req, res) => {
    const {
        Pickupid,
        userid,
        itemName,
        items,
        quantity,
        itemPrice,
        TotalPrice
    } = req.body;

    try {
        const Pick = await Pickup.create({
            Pickupid,
        userid,
        itemName,
        items,
        quantity,
        itemPrice,
        TotalPrice
        });
        res.status(201).json(Pick); // 201 for resource created successfully
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getallPickup = async (req, res) => {
    try {
        const Pick = await Pickup.find({});
        res.status(200).json(Pick);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getbyIdPickup = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const Pick = await Pickup.findById(id);

        if (!Pick) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(Pick);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const updatePickup = async (req, res) => {
    const { id } = req.params;
    const {
        Pickupid,
        userid,
        itemName,
        quantity,
        itemPrice,
        TotalPrice
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const Pick = await Pickup.findOneAndUpdate({ _id: id }, {
            Pickupid,
        userid,
        itemName,
        quantity,
        itemPrice,
        TotalPrice
        }, { new: true });

        if (!Pick) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(Pick);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const deletePickup = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const deletedPick = await Pickup.findOneAndDelete({ _id: id });

        if (!deletedPick) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(deletedPick);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};




module.exports = { createPickup, deletePickup, updatePickup, getallPickup, getbyIdPickup };
