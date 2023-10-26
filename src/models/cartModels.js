const mongoose = require('mongoose')

const cartsSchema = mongoose.Schema({
    products: [{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
        },
        quantity: Number
      }
    ]
})

module.exports = mongoose.model('carts', cartsSchema)