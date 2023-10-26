const { Schema, model } = require('mongoose')

const userSchema = Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    unique: true
  },
  age: Number,
  password: String,
  createdAt: Date,
  cartId: { 
    type: Schema.Types.ObjectId, 
    ref: 'carts' },
  admin: Boolean
})

module.exports = model('users', userSchema)