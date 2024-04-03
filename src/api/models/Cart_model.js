import mongoose from "mongoose";

const Schema = mongoose. Schema
const CartSchema = new Schema({
    OrderID: {type: String},
    ItemID: {type: String},
    ItemName: {type: String},
    Quantity: {type: Number},
    ItemPrice: {type: Number},
    PickupTime: {type: String}
},{
    timestamps: true,
    collection: 'Cart'
})
export default mongoose.model('Cart', CartSchema);
