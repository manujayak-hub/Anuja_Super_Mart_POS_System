import mongoose from "mongoose";

const Schema = mongoose.Schema
const taskSchema = new Schema({
    title: {type:String, required:true},
    name:{type: String, required:true},
    author:{type: String,required:true}
},{
    timestamp:true,
    collection: 'ctask'

})

export default mongoose.model ('ctask', taskSchema)
