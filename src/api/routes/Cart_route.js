import express from 'express'
const CartRoute = express.Router()
import {createCart,deleteCart,updateCart,getallCart,getbyIdCart} from '../controllers/Cart_controller'

//get all
CartRoute.get('/', getallCart)

//get by oder number
CartRoute.get('/:id', getbyIdCart) 

//create
CartRoute.post('/', createCart)

//update by id
CartRoute.patch('/:id', updateCart)

//delete by id
CartRoute.delete('/:id', deleteCart)


module.exports = CartRoute;