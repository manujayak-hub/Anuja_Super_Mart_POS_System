import order from '../models/order_model'
import mongoose from 'mongoose'


const createOrder = async( req, res) =>{

 const{orderId,customerId,ItemID,ItemName,Quantity,TotalAmount} = req.body

 try{
    const ORDER = await order.create({orderId,customerId,ItemID,ItemName,Quantity,TotalAmount})
    res.status(200).json(ORDER)

 }
 catch(error){
    res.status(400).json({error:'Server Error'})
 }
 
}

const getallOrder = async (req,res)=>{
    try{
        const ORDER = await order.find({})
        res.status(200).json(ORDER)
    }
    catch (error){
        
            console.error(error);
            res.status(500).json({error:'Server Error'})
        
    }

}


const getbyIDOrder= async (req,res)=>{

 const {id} = req.params

 if(!mongoose.Types.ObjectId.isValid(id)){

    return res.status(404).json({error:'Invalid ID format'})

 }

 const ORDER = await order.findById(id)

 if(!ORDER){
    return res.status(404).json({eror:'No such Order'})
 }
 res.status(200).json(ORDER)

}



const updateOrder = async(req,res)=>{

   var{id} = req.params
   const{orderId,customerId,ItemID,ItemName,Quantity,TotalAmount}= req.body
   if(!mongoose.Types.ObjectId.isValid(id)){

    return res.status(400).json({error:'Invalid ID format'})
   }
    const ORDER = await order.findOneAndUpdate({_id:id},
    {orderId,customerId,ItemID,ItemName,Quantity,TotalAmount},
    { new: true }// To return the update document
    )

    if(!order){
        return res.status(400).json({error:'no such a order'})
    }
    res.status(200).json(ORDER)
 }




 const deleteOrder = async(req,res)=> {
    var {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(400).json({error:'Invalid ID format'})

    
 }
 try{
    const deletedOrder = await order.findOneAndDelete({_id:id});
 
 if(!deletedOrder){
return res.status(404).json({error:'No such Order'});
 }
 res.status(200).json(deletedOrder)}
 catch (error){
    console.error(error);
    res.status(400).json({error:'Internet Server Error'});
 }
 res.status(200).json(order)

}
  
module.exports={createOrder,getbyIDOrder,updateOrder,deleteOrder,getallOrder};
