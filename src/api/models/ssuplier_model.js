import mongoose from "mongoose";

const Schema = mongoose.Schema;
const SuplierSchema = new Schema({
    name: { type: String },
    suplierId: { type: Number },
    ProductQuantity: { type: Number }
}, {
    timestamps: true,
    collection: 'Supliers'
});

export default mongoose.model('Supliers', SuplierSchema);
