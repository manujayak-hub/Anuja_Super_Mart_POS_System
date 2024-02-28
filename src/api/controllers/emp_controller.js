import employee from '../models/emp_model'
import mongoose from 'mongoose'

const createEmp = async (req, res) =>{

    const {title, name, author} = req.body

    try {
        const EMPLOYEE = await employee.create({title, name, author})
        res.status(200).json(EMPLOYEE)
    }catch (error) {
        res.status(400).json({error:'Server Error'})
    }
}
const getallEmp = async (req, res) => {

    try {
            const EMPLOYEEs = await employee.find({});
            res.status(200).json(EMPLOYEEs);
    } catch (error) {
            console.error(error);res.status(500).json({error:'Server Error'})
    }
}


const getbyIdEmp = async (req,res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid ID Format'})
    }
    const EMPLOYEE = await employee.findById(id)

    if (!EMPLOYEE) {
        return res.status(404).json({error: 'No such Employee'})
    }

    res.status(200).json(EMPLOYEE)
}

const updateEmp = async (req,res) => {
    var {id} = req.params

    const {title, name, author} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Invalid ID Format'})
    }
    const EMPLOYEE = await employee.findOneAndUpdate({_id:id},
        {title, name, author},
        { new: true }
    )

    if (!EMPLOYEE) {
        return res.status(400).json({error:'no such employee'})
        }
    res.status(200).json(EMPLOYEE)    
}

const deleteEmp = async (req, res) => {
    var {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID Format'})
    }

    try {
        const deletedemployee = await employee.findOneAndDelete({_id:id});

        if (!deletedemployee) {
            return res.status(404).json({error: 'No Such Employee'});
        }

        res.status(200).json(deletedemployee);
    } catch(error) {
        console.error(error);
        res.status(400).json({error: 'Internal Server Error'});
    }
        res.status(200).json(employee)
}

module.exports={createEmp, deleteEmp, updateEmp, getallEmp,getbyIdEmp};
