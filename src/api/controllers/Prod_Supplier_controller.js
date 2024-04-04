import Prodsup from '../models/Prod_Supplier_model';
import mongoose from 'mongoose';

const createProdsup = async (req, res) => {
    const {
    SupId,
    supname,
    Contactno,
    email,
    contsappname,
    supstatus,
    note
    } = req.body;

    try {
        const Psup = await Prodsup.create({
        SupId,
        supname,
        Contactno,
        email,
        contsappname,
        supstatus,
        note
        });
        res.status(201).json(Psup); // 201 for resource created successfully
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getallProdsup = async (req, res) => {
    try {
        const Psup = await Prodsup.find({});
        res.status(200).json(Psup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getbyIdProdsup = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'invalid ID Format' });
    }

    try {
        const Psup = await Prodsup.findById(id);

        if (!Psup) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(Psup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const updateProdsup = async (req, res) => {
    const { id } = req.params;
    const {
        SupId,
        supname,
        Contactno,
        email,
        contsappname,
        supstatus,
        note
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'invalid ID Format' });
    }

    try {
        const Psup = await Prodsup.findOneAndUpdate({ _id: id }, {
            SupId,
        supname,
        Contactno,
        email,
        contsappname,
        supstatus,
        note
        }, { new: true });

        if (!Psup) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(Psup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const deleteProdsup = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'invalid ID format' });
    }

    try {
        const deletedPsup = await Prodsup.findOneAndDelete({ _id: id });

        if (!deletedPsup) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(deletedPsup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports = { createProdsup, deleteProdsup, updateProdsup, getallProdsup, getbyIdProdsup };
