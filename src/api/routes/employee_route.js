import express from 'express'
const emp_route = express.Router()
import{createEmp, deleteEmp, updateEmp, getallEmp,getbyIdEmp}  from '../controllers/emp_controller'

//get all
emp_route.get('/', getallEmp)

//get by id
emp_route.get('/:id', getbyIdEmp)

//create
emp_route.post('/', createEmp)

//update by id
emp_route.patch('/:id', updateEmp)

//delete by id
emp_route.delete('/:id', deleteEmp)

module.exports = emp_route