import mongoose from "mongoose";

const Schema = mongoose. Schema
const CustomerSchema = new Schema({
    name: {type: String, required:true}, 
    number: {type: String, required: true}, 
},{
    timestamps: true,
    collection: 'Customer'
})
export default mongoose.model('Customer', CustomerSchema);
