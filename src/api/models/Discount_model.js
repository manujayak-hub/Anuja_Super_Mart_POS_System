import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DiscountSchema = new Schema(
  {
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    productDiscount: { type: Number, required: true },
    productDescription: { type: String, required: true },
    productExpireDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    collection: 'discount'
  }
);

export default mongoose.model('Discount', DiscountSchema);
