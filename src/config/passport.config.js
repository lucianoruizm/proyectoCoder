const passport = require('passport')
const passportLocal = require('passport-local')
const userModel = require('../dao/models/userModel')
const { createHash, isValidPassword } = require('../utils/passwordHash')

const LocalStrategy = passportLocal.Strategy

const initializePassport = () => {
  passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
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
    }
  ))

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return done(null, false, { message: 'Credenciales incorrectas' });
      }
  
      if (!isValidPassword(password, user.password)) {
        return done(null, false, { message: 'Datos incorrectos' });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    console.log('serializeUser')
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser')
    const user = await userModel.findById(id)
    console.log("USER EN PASSPORT DESERIALIZE", user)
    done(null, user)
  })
}

module.exports = initializePassport