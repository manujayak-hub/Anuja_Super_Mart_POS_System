import express from 'express'
const Pickup_Route = express.Router()
import{createPickup, deletePickup, updatePickup, getallPickup, getbyIdPickup} from '../controllers/pickup_controller'

//GET all Dicounts
Pickup_Route.get('/', getallPickup)

//GET by id
Pickup_Route.get('/:id', getbyIdPickup)

//create
Pickup_Route.post('/', createPickup)

//update by id
Pickup_Route.patch('/:id', updatePickup)

//delete by id
Pickup_Route.delete('/:id', deletePickup)
   
module.exports = Pickup_Route;