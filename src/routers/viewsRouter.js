const express = require('express')
const axios = require('axios')
const viewsRouter = express.Router()
const { authMiddleware, isAdmin, isPremium, isUser, isLoggedIn } = require('../middlewares/auth')
const { config } = require('dotenv')

const base_url = config.BASE_URL 

viewsRouter.get('/register', (req, res) => {
    if (res.user) {
      return 
    }
    try {
      return res.render('register')
    } catch (error) {
      return error
    }
})

viewsRouter.get('/', (req, res) => {
  try {
    return res.render('login')
  } catch (error) {
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
    user = user.toObject()
    const cartId = req.user.cartId
    return res.render('profile', { user, cartId })
})

viewsRouter.get('/products', isUser, authMiddleware, (req, res, next) => {
        if (!req.user) {
            return res.redirect('/')
        }
        
        return next()
        }, async (req, res) => {

            let user = req.user
            user = user.toObject()

            const limit = req.query.limit
            const page = req.query.page
            const category = req.query.category || null
            const status = req.query.status || null
            const sort = req.query.sort
            let owner = ''

            if (req.user.premium) {
                owner = `&owner=${req.user.email}`
            }

            const cartId = req.user.cartId
    
            let url = `${base_url}/api/products?limit=${limit}&page=${page}${owner}&sort=${sort}`
            
            if (category) {
                url = `${base_url}/api/products?limit=${limit}&page=${page}${owner}&category=${category}&sort=${sort}`
            }
            if (status !== null) {
                url = `${base_url}/api/products?limit=${limit}&page=${page}${owner}&status=${status}&sort=${sort}`
            }
            if (category & status) {
                url = `${base_url}/api/products?limit=${limit}&page=${page}${owner}&category=${category}&status=${status}&sort=${sort}`
            }
    
            const response = await axios.get(url)
    
            const products = response.data
    
            const pageNumber = page !== undefined ? parseInt(page) : 1
    
            if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > products.totalPages) {
                const message = "El numero de pagina no es valido"
                return res.render('errorView', { message })
            }
    
            res.render('products', { products, cartId, user })
        
})

viewsRouter.get('/menuAdmin', isAdmin, authMiddleware, (req, res, next) => {
    if (!req.user) {
        return res.redirect('/')
    }
    return next()
    }, async (req, res) => {
        res.render('menuAdmin')
})

viewsRouter.get('/userManagement', isAdmin, authMiddleware, (req, res, next) => {
    if (!req.user) {
        return res.redirect('/')
    }
    
    return next()
    }, async (req, res) => {

        const limit = req.query.limit
        const page = req.query.page
        const sort = req.query.sort

        let url = `${base_url}/api/users?limit=${limit}&page=${page}&sort=${sort}`

        const response = await axios.get(url)

        const users = response.data

        const pageNumber = page !== undefined ? parseInt(page) : 1

        if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > users.totalPages) {
            const message = "El numero de pagina no es valido"
            return res.render('errorView', { message })
        }

        res.render('userManagement', { users })
    
})

viewsRouter.get('/productsManagement', isAdmin, authMiddleware, (req, res, next) => {
        if (!req.user) {
            return res.redirect('/')
        }
        return next()
        }, async (req, res) => {

        const limit = req.query.limit
        const page = req.query.page
        const category = req.query.category || null
        const status = req.query.status || null
        const sort = req.query.sort

        let url = `${base_url}/api/products/productsManagement?limit=${limit}&page=${page}&sort=${sort}`
        
        if (category) {
            url = `${base_url}/api/products/productsManagement?limit=${limit}&page=${page}&category=${category}&sort=${sort}`
        }
        if (status !== null) {
            url = `${base_url}/api/products/productsManagement?limit=${limit}&page=${page}&status=${status}&sort=${sort}`
        }
        if (category & status) {
            url = `${base_url}/api/products/productsManagement?limit=${limit}&page=${page}&category=${category}&status=${status}&sort=${sort}`
        }

        const response = await axios.get(url);

        const products = response.data
        const pageNumber = page !== undefined ? parseInt(page) : 1

        if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > products.totalPages) {
            const message = "El numero de pagina no es valido"
            return res.render('errorView', { message })
        }

        res.render('productsManagement', { products })
})

viewsRouter.get('/productsPremium', isPremium, authMiddleware, (req, res, next) => {
    if (!req.user) {
        return res.redirect('/')
    }
    return next()
    }, async (req, res) => {

    const limit = req.query.limit
    const page = req.query.page
    const category = req.query.category || null
    const status = req.query.status || null
    const owner = req.user.email
    const sort = req.query.sort

    let url = `${base_url}/api/products/productsPremium?limit=${limit}&page=${page}&owner=${owner}&sort=${sort}`
    
    if (category) {
        url = `${base_url}/api/products/productsPremium?limit=${limit}&page=${page}&owner=${owner}&category=${category}&sort=${sort}`
    }
    if (status !== null) {
        url = `${base_url}/api/products/productsPremium?limit=${limit}&page=${page}&owner=${owner}&status=${status}&sort=${sort}`
    }
    if (category & status) {
        url = `${base_url}/api/products/productsPremium?limit=${limit}&page=${page}&owner=${owner}&category=${category}&status=${status}&sort=${sort}`
    }

    const response = await axios.get(url);

    const products = response.data
    console.log("Productos Premium: ", products)
    const pageNumber = page !== undefined ? parseInt(page) : 1

    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > products.totalPages) {
        const message = "El numero de pagina no es valido"
        return res.render('errorView', { message })
    }

    res.render('productsPremium', { products })
})

viewsRouter.get('/cart/:cid', isUser, authMiddleware, async (req, res) => {
    try {
        let user = req.user
        user = user.toObject()

        const cartId = req.params.cid
        const response = await axios.get(`${base_url}/api/carts/${cartId}`)
        const cart = response.data

        res.render('carts', { cart, user })
    } catch (error) {
        console.log(error)
        res.render('carts', { error: 'Error al obtener los productos'})
    }
})

module.exports = viewsRouter