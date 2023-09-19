const express = require('express')
const passport = require('passport')
const userModel = require('../dao/models/userModel')
const { createHash, isValidPassword } = require('../utils/passwordHash')

const sessionRouter = express.Router()

sessionRouter.get('/', (req, res) => {
  return res.json(req.session)
})

sessionRouter.post('/register', 
  passport.authenticate('register'),
  async (req, res) => {
    console.log(res.json(req.user))
})

sessionRouter.post('/login', 
  passport.authenticate('login'),
  async (req, res) => {
    console.log({
      user: req.user,
      session: req.session
    })
    return res.json(req.user)
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