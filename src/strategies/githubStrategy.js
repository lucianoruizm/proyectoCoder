const GitHubStrategy = require('passport-github2')
const userModel = require('../dao/models/userModel')

const gitHubStrategy = new GitHubStrategy({
  clientID: 'Iv1.ae18f720827127f6',
  clientSecret: 'd1f5c08e72747c2726a912ad3406af284233b3b0',
  callbackURL: 'http://localhost:8080/api/session/github-callback'
  }, async (accessToken, refreshToken, profile, done) => {
  
    try {
      const user = await userModel.findOne({ email: profile._json.login })
  
      if (user) {
        console.log('Usuario ya existe')
        return done(null, user)
      }

      const newUser = await userModel.create({
        email: profile._json.login,
        name: profile._json.name
      })

      return done(null, newUser)
    } catch (e) {
      return done(e)
    }
})

module.exports = gitHubStrategy