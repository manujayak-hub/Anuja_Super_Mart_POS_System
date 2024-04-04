const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema  = new Schema({
    transactionID: {
        type: String, 
        required: true, 
        unique: true 
    },
    transactionDateTime: {
        type: Date,
        required: true,
        
    },
    transactionType: {
        type: String,
        required: true
    },
    transactionAmount: {
        type: Number,
        required: true
    },
    transactionMethod: {
        type: String,
        required: true
    
    }


},{ timestamps: true ,
    collection: 'Transactions'})

    const typeTotalSchema = new Schema({
        type: {
            type: String,
            required:true,
        },
        totalAmount: {
            type: Number,
            default: 0
        }
    });
    
    module.exports.TypeTotal = mongoose.model('TypeTotal', typeTotalSchema);
    module.exports.Transactions = mongoose.model('Transactions', transactionSchema);




