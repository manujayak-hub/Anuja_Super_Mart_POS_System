import express from 'express'
const Discount_route = express.Router()
import{createDiscount,deleteDiscount,updateDiscounts,getallDiscount,getbyIdDiscount} from '../controllers/Discount _controller'

//GET all Dicounts
Discount_route.get('/', getallDiscount)

//GET by id
Discount_route.get('/:id', getbyIdDiscount)

//create
Discount_route.post('/', createDiscount)

//update by id
Discount_route.patch('/:id', updateDiscounts)

//delete by id
Discount_route.delete('/:id', deleteDiscount)
   
module.exports = Discount_route;