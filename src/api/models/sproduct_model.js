import mongoose from "mongoose";

const Schema = mongoose. Schema
const SproductSchema = new Schema({
    productId: { type: String },
    productName: { type: String },
    productDiscount: { type: String },
    productDescription: { type: String },
    productExpireDate: { type: String },
    productImage: { type: String }, 
},{
    timestamps: true,
    collection: 'Sproduct'
})
export default mongoose.model('Sproduct', SproductSchema);
