import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    suppliername: { type: String, required: true },
    productname: { type: String, required: true },
    productQuantity: { type: Number, required: true, min: 1 },
    startingDate: { type: Date, required: true },
    expireDate: { type: Date, required: true, min: 1 },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    collection: 'Itask' // Specify the collection name explicitly
});

export default mongoose.model('Itask', orderSchema);
