const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productsSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    thumbnail: String,
    code: {
        type: String,
        unique: true,
        required: true
    },
    stock: Number,
    status: Boolean,
    category: String,
    owner: String,
})
productsSchema.plugin(mongoosePaginate)

module.exports = model('products', productsSchema)