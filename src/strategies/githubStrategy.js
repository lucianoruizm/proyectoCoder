const GitHubStrategy = require('passport-github2')
const userModel = require('../models/userModel')
const { generateToken } = require('../utils/jwt')
const dotenv = require('dotenv')
const configFn = require('../config')

dotenv.config()
const config = configFn()

const gitHubStrategy = new GitHubStrategy({
  clientID: config.clientid,
  clientSecret: config.clientsecret,
  callbackURL: config.BASE_URL + '/api/session/github-callback'
  }, async (accessToken, refreshToken, profile, done) => {
  
    try {
      let user = await userModel.findOne({ email: profile._json.login })
  
      if (user) {
        console.log('Usuario ya existe')
        return done(null, user)
      }

      const newUser = await userModel.create({
        email: profile._json.login,
        name: profile._json.name,
      })
      
      const token = generateToken(newUser)
      console.log({ token })

      return done(null, {
        ...newUser,
        access_token: token
      })
    } catch (e) {
      return done(e)
    }
})

module.exports = gitHubStrategy