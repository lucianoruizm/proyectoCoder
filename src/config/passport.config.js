const passport = require('passport')
const userModel = require('../models/userModel')
const gitHubStrategy = require('../strategies/githubStrategy')
const registerLocalStrategy = require('../strategies/registerLocalStrategy')
const loginLocalStrategy = require('../strategies/loginLocalStrategy')
const passportJWT = require('passport-jwt')

const JWTStrategy = passportJWT.Strategy
const extractJWT = passportJWT.ExtractJwt

const cookieExtractor = (req) => {
  return req.cookies && req.cookies.authToken
}

const initializePassport = () => {

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: 'jwtsecret'
  }, (jwtPayload, done) => {
    done(null, jwtPayload.user)
  }))

  passport.use('github', gitHubStrategy)
  passport.use('register', registerLocalStrategy)
  passport.use('login', loginLocalStrategy)

  passport.serializeUser((user, done) => {
    console.log('serializeUser')
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser')
    const user = await userModel.findById(id)
    done(null, user)
  })
}

module.exports = initializePassport