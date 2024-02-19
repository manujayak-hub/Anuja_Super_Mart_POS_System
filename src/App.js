import express from "express"
import {logger} from "./utills/loggerfile"
import cors from "cors"
import MongoConnect from "./configs/DB_Connection"
import cusRoute from "./api/routes/customer_routes"
import "dotenv/config"


const app = express()
const PORT = process.env.PORT

app.use(cors())

app.use(express.json({limit:'20mb'}))

app.use((req,res,next) => {
    logger.warn(req.method,req.path)
    next()
})

app.use('/customer', cusRoute)

app.listen(PORT , ()=>{
    logger.info("Connected via Port " + PORT)
    MongoConnect()
    
})



