import mongoose from "mongoose";

const Schema = mongoose. Schema
const PickupSchema = new Schema({
    OrderID: {type: String, required:true}, 
    Items: {type: String, required: true}, 
    Time: {type: String, required: true}, 
    Quantity: {type: String, required: true}, 
},{
    timestamps: true,
    collection: 'Pickup'
})
export default mongoose.model('Pickup', PickupSchema);
