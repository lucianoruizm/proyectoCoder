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
    console.log("cookies token: ", token)
  
    if (!token) {
      return res.status(401).json({
        error: 'No puede acceder'
      })
    }
  
    try {
      const payload = await verifyToken(token)
      console.log("payload en authMiddleware: ", payload)
    } catch (e) {
      return res.status(401).json({
        error: 'Token de acceso invalido'
      })
    }
    return next()
}

const isLoggedIn = (req, res, next) => {
    if(req.user){
        console.log("ya esta con una sesion abierta")
        res.redirect('/profile')
    } else {
        next()
    }
}

// MIDDLEWARES ROLES (PODRIA IMPLEMENTARSE DE UNA FORMA MEJOR)
const isAdmin = (req, res, next) => {
    if(req.user && req.user.admin) {
        console.log("Is ADMIN")
        next()
    } else {
        res.redirect('/products')
    }
}

const isUser = (req, res, next) => {
    if(req.user && !req.user.admin) {
        console.log("Is USER")
        next()
    } else {
        res.redirect('/productsManagement')
    }
}

module.exports = { authMiddleware, isAdmin, isUser, isLoggedIn }