import express from "express"
import {logger} from "./utills/loggerfile"
import cors from "cors"
import MongoConnect from "./configs/DB_Connection"
import session from 'express-session';
import transaction_routes from "./api/routes/transactions_routes"
import ctask_route from "./api/routes/ctask_route"
import employee_route from "./api/routes/employee_route"
import cusRoute from "./api/routes/customer_routes"
import CartRoute from "./api/routes/Cart_route"
import invRoute from './api/routes/Inventory_routes'
import analyticRoute from "./api/routes/analytic_route"
import order_route from "./api/routes/order_route"
import User_route from "./api/routes/user_routes"
import pickup_rouete from './api/routes/pickup_route'
import prodRoute from './api/routes/product_route'

import ProdsupRoute from './api/routes/Prod_Supplier_route'





import "dotenv/config"



const app = express()
const PORT = process.env.PORT
const SECRET = process.env.SECRET


app.use(cors({
    origin: 'http://localhost:5173', 
optionsSuccessStatus: 200} ))

app.use(session({
    secret: SECRET, 
    resave: false,
    saveUninitialized: true
}));

//middleware
app.use(express.json())

app.use((req,res,next) => {
console.log(req.path,req.method)
next()
})

//routes
app.use('/transactions', transaction_routes)
//Supplier_Task
app.use('/ctask', ctask_route)


//employee
app.use('/emp', employee_route)
//cashier
app.use('/order',order_route)
//customer
app.use('/customer', cusRoute)
//Cart
app.use('/Cart',CartRoute)
//analytics
app.use('/analytics', analyticRoute)
//inventory
app.use('/inventory', invRoute )
//Authentication
app.use('/auth',User_route)


//product
app.use('/product',prodRoute)
//pick up
app.use('/pickup',pickup_rouete)

//prod_supplier
app.use('/supplier',ProdsupRoute)





app.listen(PORT , ()=>{
    logger.info("Connected via Port " + PORT)
    MongoConnect()

})