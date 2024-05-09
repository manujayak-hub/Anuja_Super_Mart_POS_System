import Sproduct from '../models/sproduct_model'
import mongoose from 'mongoose'

const createSproduct = async (req ,res) =>{

    const {productId, productName, productDiscount,productDescription,productExpireDate,productImage} = req.body

    try {
        const SPO = await Sproduct.create({productId, productName, productDiscount,productDescription,productExpireDate,productImage})
        res.status(200).json(SPO)

    } catch (error) {
        res.status(400).json({error:'Server Error'})
    }

}

const getallSproduct = async (req, res) => {
   

    try {
      const SPO = await Sproduct.find({});
      res.status(200).json(SPO);

  } catch (error) {

      console.error(error);
      res.status(500).json({error:'Server Error'});
  }
}

 
const getbyIdSproduct= async (req,res) => {

    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID Format'})
    }
    const SPO = await Sproduct.findById(id)

    if (!SPO) {
        return res.status(404).json({error: 'No such Book'})
      }
    
      res.status(200).json(SPO)

}

const updateSproduct =async (req,res) => {
    var {id} = req.params

    const {productId, productName, productDiscount,productDescription,productExpireDate,productImage} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID Format'})
      }

    const SPO = await Sproduct.findOneAndUpdate({_id:id},
        {productId, productName, productDiscount,productDescription,productExpireDate,productImage}, 
        { new: true } 
    )

    if (!SPO) {
        return res.status(400).json({error:'no such a ID'})
      }

    res.status(200).json(SPO)

}

const deleteSproduct = async (req, res) => {
    var {id}  = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error:'Invalid ID Format'})
    }
  

    try {
      const deletedSPO = await Sproduct.findOneAndDelete({_id: id});

      if (!deletedSPO) {
          return res.status(404).json({error: 'No such ID'});
      }

      res.status(200).json(deletedSPO);
  } catch (error) {
      console.error(error);
      res.status(400).json({error: 'Internal Server Error'});
  }
    res.status(200).json(Sproduct)
  }

module.exports={createSproduct,deleteSproduct,updateSproduct,getallSproduct,getbyIdSproduct};