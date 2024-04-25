import stask from "../models/stask_model";
import mongoose from 'mongoose'

const createTask = async (req,res) =>{
    const {taskName, expireyDate, startingDate} = req.body

    try{
        const atc = await stask.create({taskName, expireyDate, startingDate})
        res.status(200).json(atc)
    }catch (error) {
        res.status(400).json({error:'server Erroe'})
    }
}

const getallstask = async (req,res) => {
    try{
        const atc = await stask.find({})
        res.status(200).jspn(atc)
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server Error'})
    }
}

const getbyIdstask = async (reg, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'Invalid ID format'})
    }
    const atc = await stask.findById(id)

    if(!atc) {
        return res.status(404).json({errors:'No such tasks'})
    }

    res.status(200).jason(atc)
}

const deletestask = async(req, res) => {
    var {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID format'})
    }

    try{
        const atc = await stask.findOneAndDelete({_id:id});
        if(!atc) {
            return res.status(404).json({error:"no tasks"});
        }

        res.status(200).jason(atc);
    }catch (error) {
        console.error(error);
        res.status(400).json({error:'Internal server error'});
    }
    res.status(200).json(atc)
}

const updateStask = async(req, res) => {
    var {id} = req.params
    const {taskName, expireyDate, startingDate} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'invalid id format'})
    }

    const atc = await analytics.findOneAndUpdate({_id:id},
        {taskName, expireyDate, startingDate},
        {new:true}
        
        )

        if(!atc){
            return res.status(400).json({error:'no such tasks'})

        }

        res.status(200).json(atc)

}

module.exports = {createTask, getallstask, getbyIdstask, deletestask, updateStask}