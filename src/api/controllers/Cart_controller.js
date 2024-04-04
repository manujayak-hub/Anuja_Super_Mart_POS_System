import Cart from '../models/Cart_model'
import mongoose from 'mongoose'




const createCart = async (req ,res) =>{

    const {OrderID,ItemID,ItemName,Quantity,TotalAmount,PickupTime} = req.body

    try {
        const OD = await Cart.create({OrderID,ItemID,ItemName,Quantity,TotalAmount,PickupTime})
        res.status(200).json(OD)

    } catch (error) {
        res.status(400).json({error:'Server Error'})
    }

}

const getallCart = async (req, res) => {
   

    try {
      const OD = await Cart.find({});
      res.status(200).json(OD);

  } catch (error) {

      console.error(error);
      res.status(500).json({error:'Server Error'});
  }
}

const getbyIdCart = async (req,res) => {

    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID Format'})
    }
    const OD = await Cart.findById(id)

    if (!OD) {
        return res.status(404).json({error: 'No such Oder'})
      }
    
      res.status(200).json(OD)

}

const updateCart  =async (req,res) => {
    var {id} = req.params

    const {OrderID,ItemID,ItemName,Quantity,TotalAmount,PickupTime} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID Format'})
      }

    const OD = await Cart.findOneAndUpdate({_id:id},
        {OrderID,ItemID,ItemName,Quantity,TotalAmount,PickupTime}, 
        { new: true } 
    )

    if (!OD) {
        return res.status(400).json({error:'no such a oder'})
      }

    res.status(200).json(OD)

}

const deleteCart = async (req, res) => {
    var {id}  = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error:'Invalid ID Format'})
    }
  
    try {
      const deletedOD = await Cart.findOneAndDelete({_id: id});

      if (!deletedOD) {
          return res.status(404).json({error: 'No such oder'});
      }

      res.status(200).json(deletedOD);
  } catch (error) {
      console.error(error);
      res.status(400).json({error: 'Internal Server Error'});
  }
    res.status(200).json(Cart)
  }

module.exports={createCart,deleteCart,updateCart,getallCart,getbyIdCart};