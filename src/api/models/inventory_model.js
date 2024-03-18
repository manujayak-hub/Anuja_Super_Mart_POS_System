import mongoose from "mongoose";

const Schema = mongoose.Schema
const InventorySchema = new Schema(
  {
    productId: { type: String, required: true, unique: true }, 
    productName: { type: String, required: true },
    wholesalePrice: { type: Number, required: true },
    retailPrice: { type: Number, required: true },
    quantityInStock: { type: Number, required: true },
    category: { type: String, required: true },
    supplierId: { type: String, required: true },
    manufactureDate: { type: String, required: true },
    expireDate: { type: String, required: true },
    imageUrl: { type: String }
  },
  {
    timestamps: true,
    collection: "inventory"
  }
)

export default mongoose.model("inventory", InventorySchema);