import express from "express"
import {logger} from "./utills/loggerfile"
import cors from "cors"
import MongoConnect from "./configs/DB_Connection"
import ctask_route from "./api/routes/ctask_route"
import "dotenv/config"



const app = express()
const PORT = process.env.PORT

app.use(cors())

app.use(express.json({limit:'20mb'}))

app.use((req,res,next) => {
    logger.warn(req.method,req.path)
    next()
})

app.use('/ctask', ctask_route)

app.listen(PORT , ()=>{
    logger.info("Connected via Port " + PORT)
    MongoConnect()
    
})



