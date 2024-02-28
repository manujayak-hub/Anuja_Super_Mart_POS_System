import express  from "express"
const analyticRoute = express.Router()
import {createAnalytic,deleteanalytic,updateAnalytic,getallAnalytic, getbyIdanalytic} from '../controllers/analytics_controller'


//get all
analyticRoute.get('/',getallAnalytic)

//get by id 
analyticRoute.get('/:id',getbyIdanalytic)

//create
analyticRoute.post('/',createAnalytic)

//update by id
analyticRoute.patch('/:id',updateAnalytic)

//delete by id
analyticRoute.delete('/:id',deleteanalytic)

module.exports = analyticRoute;