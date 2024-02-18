import inventory from '../models/inventory_model'
import mongoose from 'mongoose'

const createInventory = async (req ,res) =>{

    const {title, name, author} = req.body

    try {
        const INV = await inventory.create({title, name, author})
        res.status(200).json(INV)

    } catch (error) {
        res.status(400).json({error:'Server Error'})
    }

    

/* {
    "title": "The Great Gatsby",
    "name": "F. Scott Fitzgerald",
    "author": "Fiction"
}

with this url http://localhost:8000/book/

this one is worked */

}

const getallinventory = async (req, res) => {
   
    try {
      const INV = await inventory.find({});
      res.status(200).json(INV);
  } catch (error) {
      console.error(error);
      res.status(500).json({error:'Server Error'});

      /*
      if we use error: error.message  for get error if it is not defined by node or whatever js it will be show
      as compile error
      */
  }
}

 
const getbyIdInventory= async (req,res) => {

    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID Format'})
    }
    const INV = await inventory.findById(id)

    if (!INV) {
        return res.status(404).json({error: 'NO Any Product!!!'})
      }
    
      res.status(200).json(INV)

      /*
      use this without colon':' to get id
      http://localhost:8000/book/65bb6fb6b31c099704636492 
      */
}

const updateInventory =async (req,res) => {
    var {id} = req.params

    const {title, name, author} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID Format'})
      }

    const INV =await inventory.findOneAndUpdate({_id:id},
        {title, name, author}, 
        { new: true } // To return the updated document
    )

    if (!inventory) {
        return res.status(400).json({error:'NO Any Product!!!'})
      }

    res.status(200).json(INV)


}

const deleteInventory = async(req,res)=> {
    var {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(400).json({error:'Invalid ID format'})

    
 }
 try{
    const deletedInv = await inventory.findOneAndDelete({_id:id});
 
 if(!deletedInv){
return res.status(404).json({error:'No such Products'});
 }
 res.status(200).json(deletedInv)}
 catch (error){
    console.error(error);
    res.status(400).json({error:'Internet Server Error'});
 }
 res.status(200).json(inventory)

}

module.exports={createInventory,deleteInventory,updateInventory ,getallinventory,getbyIdInventory};