const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }

})

module.exports = mongoose.model('ticket', ticketSchema)