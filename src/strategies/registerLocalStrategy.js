const passportLocal = require('passport-local')
const userModel = require('../models/userModel')
const { createHash } = require('../utils/passwordHash')

const LocalStrategy = passportLocal.Strategy

const registerLocalStrategy = new LocalStrategy({
    passReqToCallback: true, usernameField: 'email'
    }, async (req, username, password, done) => {
      
    try {
        const user = await userModel.findOne({ email: username })
  
        if (user) {
          console.log('Usuario ya existe')
          return done(null, false, { message: 'Error de registro' })
        }
  
        const body = req.body
        body.password = createHash(body.password)
        console.log("Datos de registro: ", { body })
        
        const newUser = await userModel.create(body)
  
        return done(null, newUser)
    } catch (e) {
      return done(e)
    }
})

module.exports = registerLocalStrategy