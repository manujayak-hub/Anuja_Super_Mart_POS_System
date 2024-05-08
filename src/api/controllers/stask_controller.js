import stask from "../models/stask_model";
import mongoose from 'mongoose'

const createTask = async (req, res) => {
    const {
        suppliername,
        productname,
        productQuantity,
        startingDate,
        expireDate
    } = req.body

    try {
        const atc = await stask.create({
            suppliername,
            productname,
            productQuantity,
            startingDate,
            expireDate
        })
        res.status(200).json(atc)
    } catch (error) {
        res.status(400).json({ error: 'Server Error' })
    }
}

const getallstask = async (req, res) => {
    try {
        const task = await stask.find({})
        res.status(200).json(task)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' })
    }
}

const getbyIdstask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID format' })
    }
    const atc = await stask.findById(id)

    if (!atc) {
        return res.status(404).json({ errors: 'No such tasks' })
    }

    res.status(200).json(atc)
}

const deletestask = async (req, res) => {
    var { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' })
    }

    try {
        const atc = await stask.findOneAndDelete({ _id: id });
        if (!atc) {
            return res.status(404).json({ error: "no tasks" });
        }

        res.status(200).json(atc);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Internal server error' });
    }
}

const updateStask = async (req, res) => {
    var { id } = req.params
    const {
        suppliername,
        productname,
        productQuantity,
        startingDate,
        expireDate
    } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'invalid id format' })
    }

    const atc = await stask.findOneAndUpdate({ _id: id },
        {
            suppliername,
            productname,
            productQuantity,
            startingDate,
            expireDate
        },
        { new: true }
    )

    if (!atc) {
        return res.status(400).json({ error: 'no such tasks' })
    }

    res.status(200).json(atc)
}

module.exports = { createTask, getallstask, getbyIdstask, deletestask, updateStask }
