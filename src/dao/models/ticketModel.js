const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datetime: String,
    amount: Number,
    purchaser: String

})

module.exports = mongoose.model('ticket', ticketSchema)