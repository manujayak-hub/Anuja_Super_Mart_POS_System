import express from "express"
import {logger} from "./utills/loggerfile"
import cors from "cors"
import MongoConnect from "./configs/DB_Connection"
import transactionRoutes from "./api/routes/transactionsRoutes"
import "dotenv/config"




const app = express()
const PORT = process.env.PORT


app.use(cors())


//middleware
app.use(express.json())

app.use((req,res,next) => {
console.log(req.path,req.method)
next()
})

//routes
app.use('/transactions', transactionRoutes)

app.listen(PORT , ()=>{
    logger.info("Connected via Port " + PORT)
    MongoConnect()
    
})