import  express  from "express"



const transactionrouter =  express.Router()
const {
    createTransaction,getallTransactions,getbyIdTransaction,deleteTransaction,updateTransaction
} = require('../controllers/transactionController')

//Get all transactions  
transactionrouter.get('/', getallTransactions)


//Get a single transaction
transactionrouter.get('/:id',getbyIdTransaction)


//Post a new transaction
transactionrouter.post('/',createTransaction )


//Delete a transaction
transactionrouter.delete('/:id',deleteTransaction)


//Update a transaction
transactionrouter.patch('/:id',updateTransaction)

module.exports = transactionrouter