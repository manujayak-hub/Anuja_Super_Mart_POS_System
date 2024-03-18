import express from 'express';
const discountRoute = express.Router();
import {
  createDiscount,
  deleteDiscount,
  updateDiscount,
  getAllDiscounts,
  getDiscountById
} from '../controllers/discount_controller';

discountRoute.get('/', getAllDiscounts);

discountRoute.get('/:id', getDiscountById);

discountRoute.post('/', createDiscount);

discountRoute.delete('/:id', deleteDiscount);

discountRoute.patch('/:id', updateDiscount);

export default discountRoute;
