const { verifyToken } = require('../utils/jwt')

// MIDDLEWARE USANDO SESSION
// const sessionMiddleware = (req, res, next) => {
//     if (req.user) {
//         console.log("sessionMiddleware entro al if de req.user")
//         return res.redirect('/products')
//     }
//     console.log("sessionMiddleware no entro al if")
//     return next()
// }

// MIDDLEWARE USANDO JWT
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.authToken
  
    if (!token) {
      return res.status(401).json({
        error: 'No tiene acceso al sitio web'
      })
    }
  
    try {
      const payload = await verifyToken(token)
      console.log("Payload en authMiddleware: ", payload)
    } catch (e) {
      return res.status(401).json({
        error: 'Token de acceso invalido'
      })
    }
    return next()
}

const isLoggedIn = (req, res, next) => {
    if(req.user){
        console.log("Ya esta con una sesion abierta")
        res.redirect('/profile')
    } else {
        next()
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.admin) {
        console.log("Is ADMIN")
        next()
    } else {
        res.redirect('/products')
    }
}

const isPremium = (req, res, next) => {
  if(req.user && req.user.premium) {
      console.log("Is PREMIUM")
      next()
  } 
  else if (req.user && req.user.admin) {
      res.redirect('/menuAdmin')
  } else {
      res.redirect('/products')
  }
}

const isUser = (req, res, next) => {
    if(req.user && !req.user.admin) {
        console.log("Is USER")
        next()
    } else {
        res.redirect('/menuAdmin')
    }
}

module.exports = { authMiddleware, isAdmin, isPremium, isUser, isLoggedIn }