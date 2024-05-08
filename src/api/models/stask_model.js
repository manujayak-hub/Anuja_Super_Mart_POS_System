import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    suppliername: { type: String },
    productname: { type: String },
    productQuantity: { type: Number },
    startingDate: { type: Date }, // Change data type to Date if these fields represent dates
    expireDate: { type: Date }, // Change data type to Date if these fields represent dates
}, {
    timestamps: true,
    // You can omit the collection option if you want Mongoose to pluralize the model name
});

export default mongoose.model('stask', orderSchema);
