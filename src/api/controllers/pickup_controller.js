import Pickup from '../models/pickup_model'
import mongoose from 'mongoose'

const createOrders = async (req ,res) =>{

    const {OrderID, Items , Time, Quantity} = req.body

    try {
        const OD = await Pickup.create({OrderID, Items , Time, Quantity})
        res.status(200).json(OD)

    } catch (error) {
        res.status(400).json({error:'Server Error'})
    }

}

const getallOrders = async (req, res) => {
   

    try {
      const OD = await Pickup.find({});
      res.status(200).json(OD);

  } catch (error) {

      console.error(error);
      res.status(500).json({error:'Server Error'});
  }
}

const getbyIdOrders = async (req,res) => {

    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID Format'})
    }
    const OD = await Pickup.findById(id)

    if (!OD) {
        return res.status(404).json({error: 'No such Oder'})
      }
    
      res.status(200).json(OD)

}

const updateOrders  =async (req,res) => {
    var {id} = req.params

    const {OrderID, Items , Time, Quantity} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID Format'})
      }

    const OD = await Pickup.findOneAndUpdate({_id:id},
        {OrderID, Items , Time, Quantity}, 
        { new: true } 
    )

    if (!OD) {
        return res.status(400).json({error:'no such a oder'})
      }

    res.status(200).json(OD)

}

const deleteOrders = async (req, res) => {
    var {id}  = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error:'Invalid ID Format'})
    }
  
    try {
      const deletedOD = await Pickup.findOneAndDelete({_id: id});

      if (!deletedOD) {
          return res.status(404).json({error: 'No such oder'});
      }

      res.status(200).json(deletedOD);
  } catch (error) {
      console.error(error);
      res.status(400).json({error: 'Internal Server Error'});
  }
    res.status(200).json(Pickup)
  }

module.exports={createOrders,deleteOrders,updateOrders,getallOrders,getbyIdOrders};