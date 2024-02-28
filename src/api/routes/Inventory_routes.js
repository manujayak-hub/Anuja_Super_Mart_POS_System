import express from 'express'
const invRoute = express.Router()
import {createInventory,
        deleteInventory,
        updateInventory,
        getallinventory,
        getbyIdInventory} from '../controllers/inventory_controller'

invRoute.get('/',getallinventory)

invRoute.get('/:id',getbyIdInventory)

invRoute.post('/',createInventory)

invRoute.delete('/:id',deleteInventory)

invRoute.patch('/:id',updateInventory)

module.exports = invRoute