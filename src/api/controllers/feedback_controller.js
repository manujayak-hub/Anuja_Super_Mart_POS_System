import feedback from '../models/feedback_model'
import mongoose from 'mongoose';

const createFeedback = async (req, res) => {
    const {
        username,
        email,
        comment,
        reaction,
        view,
        category,
        priority
    } = req.body;

    try {
        const Feed = await feedback.create({
            username,
            email,
            comment,
            reaction,
            view,
            category,
            priority
        });
        res.status(201).json(Feed); // 201 for resource created successfully
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getallFeedback = async (req, res) => {
    try {
        const Feed = await feedback.find({});
        res.status(200).json(Feed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getbyIdFeedback = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const Feed = await feedback.findById(id);

        if (!Feed) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(Feed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const updateFeedback = async (req, res) => {
    const { id } = req.params;
    const {
        username,
        email,
        comment,
        reaction,
        view,
        category,
        priority
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const Feed = await feedback.findOneAndUpdate({ _id: id }, {
            username,
        email,
        comment,
        reaction,
        view,
        category,
        priority
        }, { new: true });

        if (!Feed) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(Feed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const deleteFeedback = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const deletedFeed = await feedback.findOneAndDelete({ _id: id });

        if (!deletedFeed) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(deletedFeed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};



module.exports = { createFeedback,getallFeedback, getbyIdFeedback, updateFeedback,deleteFeedback};
