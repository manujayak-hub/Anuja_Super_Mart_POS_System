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
    amount: {
        type: Number,
        required: true
    },
    transactionMethod: {
        type: String,
        required: true
    }
},{ timestamps: true ,
    collection: 'Transactions'})


module.exports = mongoose.model('Transactions',transactionSchema)




