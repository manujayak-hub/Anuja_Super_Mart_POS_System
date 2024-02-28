import express from "express"
import {logger} from "./utills/loggerfile"
import cors from "cors"
import MongoConnect from "./configs/DB_Connection"
import ctask_route from "./api/routes/ctask_route"
import Discount_route from "./api/routes/Discount_route"
import employee_route from "./api/routes/employee_route"
import cusRoute from "./api/routes/customer_routes"
import invRoute from './api/routes/Inventory_routes'
import analyticRoute from "./api/routes/analytic_route"
import order_route from "./api/routes/order_route"
import "dotenv/config"







const app = express()
const PORT = process.env.PORT


app.use(cors())

app.use(express.json({limit:'20mb'}))

app.use((req,res,next) => {
    logger.warn(req.method,req.path)
    next()
})

//Supplier_Task
app.use('/ctask', ctask_route)
//discount
app.use('/Discount',Discount_route)
//employee
app.use('/emp', employee_route)
//cashier
app.use('/order',order_route)
//customer
app.use('/customer', cusRoute)
//analytics
app.use('/analytics', analyticRoute)
//inventory
app.use('/inventory', invRoute )




app.listen(PORT , ()=>{
    logger.info("Connected via Port " + PORT)
    MongoConnect()
    
})





