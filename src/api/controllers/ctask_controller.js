import ctask from '../models/ctask_model'
import mongoose from 'mongoose'

const createctask = async (req, res) => {
    const {title, name, author} = req.body

    try{
        const ctasks = await ctask.create({title, name,author})
        res.status(200).json (ctasks)

    } catch (error) {
        res.status(400).json({error:'Server Error'})
    }
}
    const getallctask = async (req, res) =>{

        try{
            const ctasks = await ctask.find ({});
            res.status(200). json(ctasks);
        } catch (error) {
            console.error (error);
            res.status(500).json({error:'Server Error'});

        }

    }

    const getbyIdctask = async (req,res) => {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error:'Invalid ID Format'}) 
       }
       const ctasks = await ctask.findById(id)
       if(!ctasks) {
        return res.status(404).json({error: 'No such ctask'})
       }
       res.status(200).json(ctasks)
    }

       const updatectask = async (req,res) => {
        var {id} = req.params

        const {title, name, author} = req.body

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error:'Invalid ID Format'})
        }

        const ctasks = await ctask.findOneAndUpdate({_id:id},
        {title, name, author},
        { new: true}
        )
        
        if (!ctasks) {
            return res.status(400).json({error:'no such a task'})
        }

        res.status(200).json(ctasks)


       }
    


       const deletectask = async (req, res) => {
        var { id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID Format' });
        }
    
        try {
            const deletedctask = await ctask.findOneAndDelete({ _id: id });
    
            if (!deletedctask) {
                return res.status(404).json({ error: 'No such ctask' });
            }
    
            res.status(200).json(deletedctask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' }); // Corrected status code to 500 for internal server error
        }
    };
    

module.exports= {createctask, deletectask, updatectask, getallctask, getbyIdctask};