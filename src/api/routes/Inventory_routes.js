import express from 'express'
const invRoute = express.Router()
import {createInventory,
        deleteInventory,
        updateInventory,
        getallinventory,
        getbyIdInventory,
        findInventoryByName,
        findInventoryByProductId,
        findInventoryByCategory} from '../controllers/inventory_controller'

invRoute.get('/',getallinventory)

invRoute.get('/:id',getbyIdInventory)

invRoute.post('/',createInventory)

invRoute.delete('/:id',deleteInventory)

invRoute.patch('/:id',updateInventory)

invRoute.get('/name/:itemName',findInventoryByName)

invRoute.get('/productid/:productId',findInventoryByProductId)

invRoute.get('/category/:categoryName',findInventoryByCategory)

module.exports = invRoute