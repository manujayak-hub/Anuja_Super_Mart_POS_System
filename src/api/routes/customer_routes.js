import express from 'express'
const cusRoute = express.Router()
import {createCustomer,deleteCustomer,updateCustomers,getallCustomers,getbyIdCustomer} from '../controllers/customer_controller'


//get all
cusRoute.get('/', getallCustomers)

//get by customer number
cusRoute.get('/:id', getbyIdCustomer) 

//create
cusRoute.post('/', createCustomer)

//update by id
cusRoute.patch('/:id', updateCustomers)

//delete by id
cusRoute.delete('/:id', deleteCustomer)



module.exports = cusRoute;