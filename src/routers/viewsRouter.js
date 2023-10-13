const express = require('express')
const axios = require('axios')
const viewsRouter = express.Router()
const { authMiddleware, isAdmin, isUser, isLoggedIn } = require('../middlewares/auth')


viewsRouter.get('/register', isLoggedIn, (req, res) => {
    if (res.user) {
      return 
    }
    try {
      console.log("REGISTER")
      return res.render('register')
    } catch (error) {
      console.log("ERROR REGISTER")
      return error
    }
})

viewsRouter.get('/', isLoggedIn, (req, res) => {
  try {
    console.log("LOGIN")
    return res.render('login')
  } catch (error) {
    console.log("ERROR LOGIN")
    return error
  }
})

viewsRouter.get('/recovery-password', isLoggedIn, (req, res) => {
    return res.render('recovery-password')
})

viewsRouter.get('/profile', authMiddleware, (req, res, next) => {
  if (!req.user) {
    return res.redirect('/')
  }
    return next()
  }, (req, res) => {
    let user = req.user
    console.log("PROFILE: ", user)
    user = user.toObject()
    return res.render('profile', { user })
})

viewsRouter.get('/products', isUser, authMiddleware, (req, res, next) => {
        if (!req.user) {
            console.log("PRODUCTS REDIRECT TO LOGIN")
            return res.redirect('/')
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
    
            const token = req.cookies.authToken;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const products = response.data
    
            const pageNumber = page !== undefined ? parseInt(page) : 1
    
            if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > products.totalPages) {
                const message = "El numero de pagina no es valido"
                return res.render('errorView', { message })
            }
    
            res.render('products', { products })
        
})

viewsRouter.get('/productsManagement', isAdmin, authMiddleware, async (req, res) => {
    try {
        if (!req.user) {
            console.log("productsManagement REDIRECT TO LOGIN")
            return res.redirect('/')
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

viewsRouter.get('/cart/:cid', isUser, authMiddleware, async (req, res) => {
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