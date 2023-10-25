const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productsSchema = Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String,
        unique: true
    },
    stock: Number,
    status: Boolean,
    category: String
})
productsSchema.plugin(mongoosePaginate)

module.exports = model('products', productsSchema)