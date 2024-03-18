const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDiscount: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productExpireDate: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    default:
      "https://doa.gov.lk/wp-content/uploads/2021/10/placeholder-172.png",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
