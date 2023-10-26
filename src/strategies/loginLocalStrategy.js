const passportLocal = require('passport-local')
const userModel = require('../models/userModel')
const { isValidPassword } = require('../utils/passwordHash')

const LocalStrategy = passportLocal.Strategy

const loginLocalStrategy = new LocalStrategy({
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
})

module.exports = loginLocalStrategy