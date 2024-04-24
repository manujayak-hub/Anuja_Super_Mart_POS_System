import Cart from '../models/Cart_model'
import mongoose from 'mongoose'


const createCart = async (req, res) => {
  const { OrderID, ItemID, ItemName, Quantity, ItemPrice, PickupTime, imageUrl } = req.body;

  if (isNaN(ItemPrice)) {
      return res.status(400).json({ error: 'Invalid Item Price' });
  }

  try {
      const OD = await Cart.create({ OrderID, ItemID, ItemName, Quantity, ItemPrice, PickupTime,imageUrl});
      res.status(200).json(OD);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
  }
};


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

    const {OrderID,ItemID,ItemName,Quantity,ItemPrice,PickupTime,imageUrl} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID Format'})
      }

    const OD = await Cart.findOneAndUpdate({_id:id},
        {OrderID,ItemID,ItemName,Quantity,ItemPrice,PickupTime,imageUrl}, 
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

  const deleteAllCart = async (req, res) => {
    try {
      const deletedODs = await Cart.deleteMany({}); // Delete all cart items
      res.status(200).json(deletedODs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports={createCart,deleteCart,updateCart,getallCart,getbyIdCart,deleteAllCart};