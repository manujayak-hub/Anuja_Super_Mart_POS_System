import express from 'express';
const stask_route = express.Router();

import {createTask, getallstask, getbyIdstask, deletestask, updateStask } from '../controllers/stask_controller';

stask_route.get('/', getallstask); // Use getallstask for retrieving all tasks
stask_route.get('/:id', getbyIdstask); // Use getbyIdstask for retrieving a task by ID
stask_route.post('/', createTask); // Use createTask for creating a new task
stask_route.patch('/:id', updateStask); // Use updateStask for updating a task
stask_route.delete('/:id', deletestask); // Use deletestask for deleting a task

module.exports = stask_route;
