import express from 'express'
const stask_route = express.Router();

import{createTask, getallstask, getbyIdstask, deletestask, updateStask } from '../controllers/stask_controller'

stask_route.get('/', createTask)

stask_route.get('/:id', getbyIdstask)

stask_route.post('/', getallstask)

stask_route.patch('/:id', updateStask)

stask_route.delete('/:id', deletestask)

module.exports = stask_route;