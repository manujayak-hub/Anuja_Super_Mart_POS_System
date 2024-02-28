import Customer from '../models/customer_model'
import mongoose from 'mongoose'

const createCustomer = async (req ,res) =>{

    const {name, number} = req.body

    try {
        const CUS = await Customer.create({name, number})
        res.status(200).json(CUS)

    } catch (error) {
        res.status(400).json({error:'Server Error'})
    }

}

const getallCustomers = async (req, res) => {
   

    try {
      const CUS = await Customer.find({});
      res.status(200).json(CUS);

  } catch (error) {

      console.error(error);
      res.status(500).json({error:'Server Error'});
  }
}

 
const getbyIdCustomer= async (req,res) => {

    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID Format'})
    }
    const CUS = await Customer.findById(id)

    if (!CUS) {
        return res.status(404).json({error: 'No such Book'})
      }
    
      res.status(200).json(CUS)

}

const updateCustomers =async (req,res) => {
    var {id} = req.params

    const {name, number} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID Format'})
      }

    const CUS =await Customer.findOneAndUpdate({_id:id},
        {name, number}, 
        { new: true } 
    )

    if (!CUS) {
        return res.status(400).json({error:'no such a book'})
      }

    res.status(200).json(CUS)


}

const deleteCustomer = async (req, res) => {
    var {id}  = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error:'Invalid ID Format'})
    }
  

    try {
      const deletedCUS = await Customer.findOneAndDelete({_id: id});

      if (!deletedCUS) {
          return res.status(404).json({error: 'No such Book'});
      }

      res.status(200).json(deletedCUS);
  } catch (error) {
      console.error(error);
      res.status(400).json({error: 'Internal Server Error'});
  }
    res.status(200).json(Customer)
  }

module.exports={createCustomer,deleteCustomer,updateCustomers,getallCustomers,getbyIdCustomer};