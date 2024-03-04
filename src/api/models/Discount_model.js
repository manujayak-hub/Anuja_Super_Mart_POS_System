import mongoose from "mongoose";

const Schema = mongoose.Schema;
const DiscountSchema = new Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
}, {
    timestamps: true,
    collection: 'Discount'
});

module.exports = mongoose.model('Discount', DiscountSchema);
