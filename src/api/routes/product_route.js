import express from 'express';
const prodRoute = express.Router();

import {createproduct, getallproduct, getbyIdproduct, updateproduct,deleteproduct
} from '../controllers/product_controller';


prodRoute.get('/', getallproduct);
prodRoute.get('/:id', getbyIdproduct);
prodRoute.post('/', createproduct);
prodRoute.delete('/:id', deleteproduct);
prodRoute.put('/:id', updateproduct);

module.exports = prodRoute;
