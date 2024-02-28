import mongoose from "mongoose";

const Schema = mongoose.Schema 
const InventorySchema = new Schema({
    title:{type: String, required:true},
    name:{type: String, required:true},
    author:{type: String, required:true}

},{
    timestamps:true,
    collection: 'inventory'
})

export default mongoose.model('inventory', InventorySchema) 