import Transactions from '../models/TransactionModel'
import mongoose from 'mongoose'

const createTransaction = async (req ,res) => {

    const {transactionID, transactionDateTime, transactionType,amount,transactionMethod} = req.body

    try {
        const transaction = await Transactions.create({transactionID, transactionDateTime, transactionType,amount,transactionMethod})
        res.status(200).json(transaction)

    } catch (error) {
        res.status(400).json({error:'Server Error'})
    }

} 

const getallTransactions = async (req, res) => {
   
        try {
          const transaction = await Transactions.find({});
          res.status(200).json(transaction);
      } catch (error) {
          console.error(error);
          res.status(500).json({error:'Server Error'});
      }
    }





 
const getbyIdTransaction= async (req,res) => {

    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID Format'})
    }
    const transaction = await Transactions.findById(id)

    if (!transaction) {
        return res.status(404).json({error: 'No such transaction'})
      }
    
      res.status(200).json(transaction)

      
}

const updateTransaction =async (req,res) => {
    var {id} = req.params

    const {transactionID, transactionDateTime, transactionType,amount,transactionMethod} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID Format'})
      }

    const transaction =await Transactions.findOneAndUpdate({_id:id},
        {transactionID, transactionDateTime, transactionType,amount,transactionMethod}, 
        { new: true } // To return the updated document
    )

    if (!transaction) {
        return res.status(400).json({error:'no such a transaction'})
      }

    res.status(200).json(transaction)


}

const deleteTransaction = async (req, res) => {
    var {id}  = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error:'Invalid ID Format'})
    }
  
    /* need try catch block to handle the errors*/
    try {
      const deletedTransaction = await Transactions.findOneAndDelete({_id: id});

      if (!deletedTransaction) {
          return res.status(404).json({error: 'No such transaction'});
      }

      res.status(200).json(deletedTransaction);
  } catch (error) {
      console.error(error);
      res.status(400).json({error: 'Internal Server Error'});
  }
    res.status(200).json(Transactions)
  }

module.exports={createTransaction,getallTransactions,getbyIdTransaction,updateTransaction,deleteTransaction}