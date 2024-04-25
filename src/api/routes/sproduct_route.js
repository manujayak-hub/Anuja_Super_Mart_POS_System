// sproduct_route.js

import { Router } from 'express';
const sproduct_route = Router();
import { createProduct, getAllProducts, getByIdProduct, updateProduct, deleteProducts  } from '../controllers/sproduct_controller';

sproduct_route.post('/', createProduct);
sproduct_route.get('/', getAllProducts);
sproduct_route.get('/:id', getByIdProduct);
sproduct_route.patch('/:id', updateProduct);
sproduct_route.delete('/:id', deleteProducts);

export default sproduct_route;
