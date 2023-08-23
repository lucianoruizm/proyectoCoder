const express = require('express')
const userModel = require('../dao/models/userModel')

const sessionRouter = express.Router()

sessionRouter.get('/', (req, res) => {
  return res.json(req.session)
})

sessionRouter.post('/register', async (req, res) => {
  try {
    const user = await userModel.create(req.body)
    console.log(user)
    return res.redirect('/login')

  } catch(error) {
    return error
  }
})

sessionRouter.post('/login', async (req, res) => {
  let user = await userModel.findOne({ email: req.body. email })

  if (!user) {
    return res.status(401).json({
      error: 'El usuario no existe en el sistema'
    })
  }

  if (user.password !== req.body.password) {
    return res.status(401).json({
      error: 'Datos incorrectos'
    })
  }

  user = user.toObject()

  delete user.password

  console.log("login", user)
  
  return res.redirect('/products')
})

module.exports = sessionRouter