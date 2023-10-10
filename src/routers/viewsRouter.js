const express = require('express')
const axios = require('axios')
const viewsRouter = express.Router()
const { verifyToken } = require('../utils/jwt')

// MIDDLEWATE USANDO SESSION
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
        error: 'Necesitas enviar un token de acceso'
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

// No deberia permitir ingresar si no se inicio sesion
viewsRouter.get('/register', (req, res) => {
    try {
      console.log("REGISTER")
      return res.render('register')
    } catch (error) {
      console.log("ERROR REGISTER")
      return error
    }
})

// si el usuario ya inicio sesion no se debe permitir entrar a login
viewsRouter.get('/login', (req, res) => {
  try {
    console.log("LOGIN")
    return res.render('login')
  } catch (error) {
    console.log("ERROR LOGIN")
    return error
  }
})

// igual que register si la sesion ya existe no se debe permitir el ingreso
viewsRouter.get('/recovery-password', (req, res) => {
    return res.render('recovery-password')
})

viewsRouter.get('/profile', authMiddleware, (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login')
  }
    return next()
  }, (req, res) => {
    let user = req.user
    console.log("PROFILE: ", user)
    user = user.toObject()
    return res.render('profile', { user })
})

viewsRouter.get('/products', isUser, (req, res, next) => {
        if (!req.user) {
            console.log("PRODUCTS REDIRECT TO LOGIN")
            return res.redirect('/login')
        }
        console.log("IN PRODUCTS")
        return next()
        }, async (req, res) => {

            const limit = req.query.limit
            const page = req.query.page
            const category = req.query.category || null
            const status = req.query.status || null
            const sort = req.query.sort
    
            let url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=${sort}`
            
            if (category) {
                url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&category=${category}&sort=${sort}`
            }
            if (status !== null) {
                url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&status=${status}&sort=${sort}`
            }
            if (category & status) {
                url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&category=${category}&status=${status}&sort=${sort}`
            }
    
            const response = await axios.get(url)
    
            const products = response.data
    
            const pageNumber = page !== undefined ? parseInt(page) : 1
    
            if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > products.totalPages) {
                const message = "El numero de pagina no es valido"
                return res.render('errorView', { message })
            }
    
            res.render('products', { products })
        
})

viewsRouter.get('/productsManagement', isAdmin, async (req, res) => {
    try {
        if (!req.user) {
            console.log("productsManagement REDIRECT TO LOGIN")
            return res.redirect('/login')
        }
        const limit = req.query.limit
        const page = req.query.page
        const category = req.query.category || null
        const status = req.query.status || null
        const sort = req.query.sort

        let url = `http://localhost:8080/api/products/productsManagement?limit=${limit}&page=${page}&sort=${sort}`
        
        if (category) {
            url = `http://localhost:8080/api/products/productsManagement?limit=${limit}&page=${page}&category=${category}&sort=${sort}`
        }
        if (status !== null) {
            url = `http://localhost:8080/api/products/productsManagement?limit=${limit}&page=${page}&status=${status}&sort=${sort}`
        }
        if (category & status) {
            url = `http://localhost:8080/api/products/productsManagement?limit=${limit}&page=${page}&category=${category}&status=${status}&sort=${sort}`
        }

        const response = await axios.get(url)

        const products = response.data
        const pageNumber = page !== undefined ? parseInt(page) : 1

        if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > products.totalPages) {
            const message = "El numero de pagina no es valido"
            return res.render('errorView', { message })
        }

        res.render('productsManagement', { products })
    } catch (error) {
        console.log(error)
        res.render('products', { error: 'Error al obtener los productos'})
    }
})

viewsRouter.get('/cart/:cid', isUser, async (req, res) => {
    try {
        const cartId = req.params.cid
        const response = await axios.get(`http://localhost:8080/api/carts/${cartId}`)
        const cart = response.data
        console.log(cart)

        res.render('carts', { cart })
    } catch (error) {
        console.log(error)
        res.render('carts', { error: 'Error al obtener los productos'})
    }
})

module.exports = viewsRouter