import express from 'express';
const CartRoute = express.Router();
import { createCart, deleteCart, updateCart, getallCart, getbyIdCart, deleteAllCart } from '../controllers/Cart_controller';

// Get all cart items
CartRoute.get('/', getallCart);

// Get cart item by ID
CartRoute.get('/:id', getbyIdCart);

// Create a new cart item
CartRoute.post('/', createCart);

// Update cart item by ID
CartRoute.patch('/:id', updateCart);

// Delete cart item by ID
CartRoute.delete('/:id', deleteCart);

// Delete all cart items
CartRoute.delete('/', deleteAllCart);

module.exports = CartRoute;
