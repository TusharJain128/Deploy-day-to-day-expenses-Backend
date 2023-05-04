const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({

    userId:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
        enum: ["Income", "Expense"]
    },
    date:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    describe:{
        type: String
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Account', accountSchema)