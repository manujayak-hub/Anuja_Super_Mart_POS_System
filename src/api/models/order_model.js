import mongoose from "mongoose";

const Schema = mongoose.Schema
const orderSchema = new Schema({


title:{type:String, required:true},
name:{type:String, required:true},
author:{type:String, required:true},

},{

timestamps:true,
collection:'order'

}
)
export default mongoose.model('order',orderSchema)
