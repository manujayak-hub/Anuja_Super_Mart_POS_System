import express from 'express'
const odRoute = express.Router()
import {createOrders,deleteOrders,updateOrders,getallOrders,getbyIdOrders} from '../controllers/pickup_controller'

//get all
odRoute.get('/', getallOrders)

//get by oder number
odRoute.get('/:id', getbyIdOrders) 

//create
odRoute.post('/', createOrders)

//update by id
odRoute.patch('/:id', updateOrders)

//delete by id
odRoute.delete('/:id', deleteOrders)


module.exports = odRoute;