
import express from 'express'
const order_route = express.Router()
import{createOrder,deleteOrder,updateOrder,getbyIDOrder,getallOrder} from '../controllers/order_controller'


//get all
order_route.get('/',getallOrder)

//get by id
order_route.get('/:id',getbyIDOrder)

//create
order_route.post('/',createOrder)

//update by id
order_route.patch('/:id',updateOrder)

//delete order
order_route.delete('/:id',deleteOrder)

module.exports = order_route