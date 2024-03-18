import mongoose from "mongoose";

const Schema = mongoose.Schema
const orderSchema = new Schema({


    orderId: {type: String},
    customerId: {type:String},
    ItemID: {type: String},
    ItemName: {type: String},
    Quantity: {type: String},
    TotalAmount: {type: String},
    date:{type:String}
    

},{

timestamps:true,
collection:'order'

}
)
export default mongoose.model('order',orderSchema)
