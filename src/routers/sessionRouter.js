const express = require('express')
const passport = require('passport')
const userModel = require('../dao/models/userModel')
const { createHash, isValidPassword } = require('../utils/passwordHash')

const sessionRouter = express.Router()

sessionRouter.get('/', (req, res) => {
  return res.json(req.session)
})

sessionRouter.post('/register', async (req, res) => {
  try {

    let user = await userModel.findOne({ email: req.body.email })
  
    if (user) {
      console.log('Usuario ya existe')
      return res.status(401).json({
        error: 'Error al crear usuario'
      })
    }

    const body = req.body
    body.password = createHash(body.password)
    console.log({ body })
    
    await userModel.create(body)
    
    return res.redirect('/login')
  } catch(error) {
    console.log(error)
    return res.status(400).json({
      error: 'Error de validacion'
    })
  }
})

sessionRouter.post('/login', async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email })

  if (!user) {
    return res.status(401).json({
      error: 'El usuario no existe en el sistema'
    })
  }

  if (!isValidPassword(req.body.password, user.password)) {
    return res.status(401).json({
      error: 'Datos incorrectos'
    })
  }

  user = user.toObject()

  delete user.password

  req.session.user = user

  console.log("login", user)
  return res.redirect('/products')
})

sessionRouter.post('/logout', async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error: "Error al cerrar sesion" })
    }
    return res.redirect('/login')
  })
})

sessionRouter.post('/recovery-password', async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email })

  if (!user) {
    return res.status(401).json({
      error: 'El usuario no existe en el sistema'
    })
  }

  const newPassword = createHash(req.body.password)
  await userModel.updateOne({ email: user.email }, { password: newPassword })

  return res.redirect('/login')
})

module.exports = sessionRouter