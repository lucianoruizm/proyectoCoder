const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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
  admin: Boolean,
  premium: Boolean,
})
userSchema.plugin(mongoosePaginate)

module.exports = model('users', userSchema)