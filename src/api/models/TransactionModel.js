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
    },
    totalSales: {
        type: Number,
        default: 0
    },
    totalPayments: {
        type: Number,
        default: 0
    },
    totalUtilityBills: {
        type: Number,
        default: 0
    },
    totalRevenue: {
        type: Number,
        default: 0
    }


},{ timestamps: true ,
    collection: 'Transactions'})


module.exports = mongoose.model('Transactions',transactionSchema)




