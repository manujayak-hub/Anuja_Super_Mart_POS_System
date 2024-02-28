import mongoose from "mongoose";

const Schema = mongoose.Schema
const AnalyticSchema = new Schema({
    customer_Id : { type : String, required: true},
    date : { type : Date, required: true},
    facts :{type:String, required: true }
},{
    timestamps:true,
    collection:'analytics'
})
export default mongoose.model('analytics',AnalyticSchema);