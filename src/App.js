import express from "express"
import {logger} from "./utills/loggerfile"
import cors from "cors"
import MongoConnect from "./configs/DB_Connection"
import invRoute from './api/routes/Inventory_routes'
import "dotenv/config"
import analyticRoute from "./api/routes/analytic_route"


// express app
const app = express()
const PORT = process.env.PORT


app.use(cors())

app.use(express.json({limit:'20mb'}))

app.use((req,res,next) => {
    logger.warn(req.method,req.path)
    next()
})

//analytics
app.use('/analytics', analyticRoute)
//inventory
app.use('/inventory', invRoute )


app.listen(PORT , ()=>{
    logger.info("Connected via Port " + PORT)
    MongoConnect()
    
})



