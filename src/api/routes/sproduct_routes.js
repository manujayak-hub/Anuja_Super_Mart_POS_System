import express from 'express'
const sopRoute = express.Router()
import {createSproduct,deleteSproduct,updateSproduct,getallSproduct,getbyIdSproduct} from '../controllers/sproduct_controller'


//get all
sopRoute.get('/', getallSproduct)

//get by product number
sopRoute.get('/:id', getbyIdSproduct) 

//create
sopRoute.post('/', createSproduct)

//update by id
sopRoute.patch('/:id', updateSproduct)

//delete by id
sopRoute.delete('/:id', deleteSproduct)



module.exports = sopRoute;