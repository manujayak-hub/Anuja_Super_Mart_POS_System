import mongoose from "mongoose";

const Schema = mongoose. Schema
const CartSchema = new Schema({
    OrderID: {type: String, required:true},
    ItemID: {type: String, required:true},
    ItemName: {type: String, required:true},
    Quantity: {type: String, required:true},
    TotalAmount: {type: String, required:true},
    PickupTime: {type: String, required:true}
},{
    timestamps: true,
    collection: 'Cart'
})
export default mongoose.model('Cart', CartSchema);
