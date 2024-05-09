import express from 'express';
const ssuplier_route = express.Router();
import { createSuplier, getallSuplier, getbyIdSuplier, updateSuplier, deleteSuplier } from '../controllers/ssuplier_controller';

ssuplier_route.get('/', getallSuplier);

// Corrected the route for getting a supplier by ID
ssuplier_route.get('/:id', getbyIdSuplier);

ssuplier_route.post('/', createSuplier);

ssuplier_route.patch('/:id', updateSuplier);

ssuplier_route.delete('/:id', deleteSuplier);

// Exporting the router
export default ssuplier_route;
