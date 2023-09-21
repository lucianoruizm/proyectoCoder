const passport = require('passport')
const userModel = require('../dao/models/userModel')
const gitHubStrategy = require('../strategies/githubStrategy')
const registerLocalStrategy = require('../strategies/registerLocalStrategy')
const loginLocalStrategy = require('../strategies/loginLocalStrategy')


const initializePassport = () => {
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
    console.log("USER EN PASSPORT DESERIALIZE", user)
    done(null, user)
  })
}

module.exports = initializePassport