import express from 'express'
const ctask_route = express.Router()
import {createctask,deletectask,updatectask,getallctask,getbyIdctask} from '../controllers/ctask_controller'

//get all task
ctask_route.get('/', getallctask)

//get by id
ctask_route.get('/:id', getbyIdctask)

//create
ctask_route.post('/', createctask)

//update by id
ctask_route.patch ('/:id', updatectask)

//delete by id
ctask_route.delete('/:id', deletectask)

module.exports = ctask_route