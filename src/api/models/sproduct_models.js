import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    productId: { type: String },
    productName: { type: String },
    productDiscount: { type: String },
    productDescription: { type: String },
    productExpireDate: { type: String },
    productImage: { type: String },
}, {
    timestamps: true, // Corrected to 'timestamps'
    collection: 'hgdjgfdjgfjk' // Adjust collection name if needed
});

export default mongoose.model('hgdjgfdjgfjk', orderSchema); // Changed model name to 'Product'
