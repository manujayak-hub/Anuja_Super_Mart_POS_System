import mongoose from "mongoose";

const Schema = mongoose.Schema
const productSchema = new Schema(
  {
    productId : {
        type : String, 
        required :true, 
        unique :true,
        trim: true,
        minlength: 3
    },
    productName : {type : String , required: true},
    productPrice : {type : Number,required: true},
    productDiscription : {type : String , required: true},
    quantityInStock : {type : Number,required: true},
    discount : {type : Number,required: true},
    expireDate : {type: Date,required: true},
    imageUrl : {type : String,required: true},
  },
  {
    timestamps: true,
    collection: "discountProduct"
  }
)

export default mongoose.model("product", productSchema);
