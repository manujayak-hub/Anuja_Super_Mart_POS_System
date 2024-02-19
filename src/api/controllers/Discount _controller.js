import Discount from '../models/Discount_model'
import mongoose from 'mongoose'

const createDiscount = async (req ,res) =>{

    const {title, name, author} = req.body

    try {
        const dis = await Discount.create({title, name, author})
        res.status(200).json(dis)

    } catch (error) {
        res.status(400).json({error:'Server Error'})
    }

}

const getallDiscount = async (req, res) => {
   
    try {
      const dis = await Discount.find({})
      res.status(200).json(dis)
  } catch (error) {
      console.error(error);
      res.status(500).json({error:'Server Error'})
  }
}

 
const getbyIdDiscount= async (req,res) => {

    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID Format'})
    }
    const dis = await Discount.findById(id)

    if (!dis) {
        return res.status(404).json({error: 'No such Book'})
      }
    
      res.status(200).json(dis)

}

const updateDiscounts =async (req,res) => {
    var {id} = req.params

    const {title,name,author} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID Format'})
      }

    const dis =await Discount.findOneAndUpdate({_id:id},
        {title,name,author}, 
        { new: true } 
    )

    if (!dis) {
        return res.status(400).json({error:'no such a book'})
      }

    res.status(200).json(dis)


}

const deleteDiscount = async (req, res) => {
    var {id}  = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error:'Invalid ID Format'})
    }
  

    try {
      const deleteddis = await Discount.findOneAndDelete({_id: id});

      if (!deleteddis) {
          return res.status(404).json({error: 'No such Book'});
      }

      res.status(200).json(deleteddis);
  } catch (error) {
      console.error(error);
      res.status(400).json({error: 'Internal Server Error'});
  }
    res.status(200).json(Book)
  }

module.exports={createDiscount,deleteDiscount,updateDiscounts,getallDiscount,getbyIdDiscount};