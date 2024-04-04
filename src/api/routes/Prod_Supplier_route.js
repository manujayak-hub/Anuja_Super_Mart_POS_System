import express from 'express'
const ProdsupRoute = express.Router()
import {createProdsup,
        deleteProdsup,
        updateProdsup,
        getallProdsup,
        getbyIdProdsup} from '../controllers/Prod_Supplier_controller'

ProdsupRoute.get('/',getallProdsup)

ProdsupRoute.get('/:id',getbyIdProdsup)

ProdsupRoute.post('/',createProdsup)

ProdsupRoute.delete('/:id',deleteProdsup)

ProdsupRoute.patch('/:id',updateProdsup)

module.exports = ProdsupRoute