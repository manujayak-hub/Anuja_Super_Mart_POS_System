const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// Create a new product
router.post("/products", productController.createProduct);

// Get all products
router.get("/products", productController.getAllProducts);

// Get a single product
router.get("/products/:id", productController.getProductById);

// Update a product
router.put("/products/:id", productController.updateProduct);

// Delete a product
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
