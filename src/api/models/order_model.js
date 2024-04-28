import mongoose from "mongoose";

const Schema = mongoose.Schema
const orderSchema = new Schema({


    orderId: {type: String,required: true},
    customerId: {type:String},
    ItemID: {type: String},
    ItemName: {type: String,required: true},
    Quantity: {type: String,required: true},
    TotalAmount: {type: String,required: true},
    date:{type:String,required: true}
    

},{

timestamps:true,
collection:'order'

}
)
export default mongoose.model('order',orderSchema)
