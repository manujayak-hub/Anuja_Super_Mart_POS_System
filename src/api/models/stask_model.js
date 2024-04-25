import mongoose from "mongoose";

const Schema = mongoose.Schema
const orderSchema= new Schema({

    supplierId: {type:Number},
    productId: {type:Number},
    productQuantity: {type:Number},
    startingDate: {type:String},
    expireDate: {type:String},

}, {
    timestamps:true,
    collection:'stask'
}

)

export default mongoose.model('stask', orderSchema)