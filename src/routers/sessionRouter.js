const express = require('express')
const passport = require('passport')
const userModel = require('../dao/models/userModel')
const { createHash } = require('../utils/passwordHash')
const { generateToken } = require('../utils/jwt')

const sessionRouter = express.Router()

sessionRouter.get('/', (req, res) => {
  return res.json(req.session)
})

sessionRouter.post('/register', 
  passport.authenticate('register'),
  // async (req, res) => {
  //   return res.redirect('/login')
  //}
  async (req, res) => {
    return res.redirect('/')
  }
)

sessionRouter.post('/login', 
  passport.authenticate('login'),
  // async (req, res) => {
  //   console.log({
  //     user: req.user,
  //     session: req.session
  //   })
  //   return res.json(req.user)
  async (req, res) => {
    const token = generateToken({
      name: req.user.name,
      rol: req.user.rol
    })
    return res.cookie('authToken', token, {
      maxAge: 60 * 60 * 1000
    }).redirect('current')
})

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
})

sessionRouter.get('/github-callback', passport.authenticate('github', { failureRedirect: '/login'}), async (req, res) => {
  const token = generateToken({
    name: req.user.name,
    rol: req.user.rol
  })
  return res.cookie('authToken', token, {
    maxAge: 60 * 60 * 1000
  }).redirect('/profile')
})

sessionRouter.post('/logout', async (req, res) => {
  res.clearCookie('authToken')
  req.session.destroy((error) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error: "Error al cerrar sesion" })
    }
    return res.redirect('/')
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

  return res.redirect('/')
})

const passportCall = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.status(401).json({
          error: info.messages ? info.messages : info.toString()
        })
      }

      req.user = user
      console.log("Passport Call: ", req.user)

      return next()
    })(req, res, next)
  }
}

sessionRouter.get('/current', passportCall('jwt'), (req, res) => {
  console.log("*** /CURRENT ***")
  return res.json({
      user: req.user,
      session: req.session
  })
})

module.exports = sessionRouter