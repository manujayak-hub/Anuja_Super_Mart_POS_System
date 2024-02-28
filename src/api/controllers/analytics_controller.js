import analytics from "../models/analytic_ model";
import mongoose from 'mongoose'


const createAnalytic = async (req ,res) =>{

    const { customer_Id, date, facts} = req.body

    try{
        const atc = await analytics.create({customer_Id, date, facts})
        res.status(200).json(atc)

    }catch (error){
        res.status(400).json({error:'Server Error'})
    }
}

const getallAnalytic = async (req, res) => {
    try {
        const atc = await analytics.find({})
        res.status(200).json(atc)

    }   catch (error){
        
        console.error(error);
        res.status(500).json({error:'Server Error'})
    }
}


const getbyIdanalytic = async (req, res) =>{
   
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID Format'})
    }
    const atc = await analytics.findByID(id)

    if (!atc) {
        return res.status(404).json({error:'No such Analytic'})
    }


    res.status(200).jason(atc)

}

const deleteanalytic = async(req, res) => {
    var {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID Format'})
    }

    try{
        const atc = await analytics.findOneAndDelete({_id:id});
if (!atc){
    return res.status(404).json({error:'No such Analytics'});

}
res.status(200).json(atc);

    }catch (error) {
        console.error(error);
        res.status(400).json({error:'Internal Server Error'});
    }
    res.status(200).json(atc)
}

const updateAnalytic = async(req, res)=>{
    var {id} = req.params

    const {customer_Id, date, facts} = req.body
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid ID Format'})
    }

    const atc = await analytics.findOneAndUpdate({_id:id},
        {customer_Id, date, facts},
        {new: true} // to return  the updated document
        )
        if (!atc){
            return res.status(400).json({error:'no such Analytics'})
        }

        res.status(200).json(atc)
 }

module.exports={createAnalytic, deleteanalytic,updateAnalytic,getallAnalytic, getbyIdanalytic}
       

