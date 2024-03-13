import mongoose from "mongoose";

const Schema = mongoose.Schema
const InventorySchema = new Schema(
  {
    productId: { type: String, required: true, unique: true }, // Make productId unique
    productName: { type: String, required: true },
    wholesalePrice: { type: Number, required: true },
    retailPrice: { type: Number, required: true },
    quantityInStock: { type: Number, required: true },
    category: { type: String, required: true },
    supplierId: { type: String, required: true },
    manufactureDate: { type: Date, required: true },
    expireDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    collection: "inventory"
  }
)

export default mongoose.model("inventory", InventorySchema);
