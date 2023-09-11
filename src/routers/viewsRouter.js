const express = require('express')
const axios = require('axios')
const viewsRouter = express.Router()

const sessionMiddleware = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/products')
    }
    return next()
}

const isAdmin = (req, res, next) => {
    if(req.session.user && req.session.user.admin) {
        next()
    } else {
        res.redirect('/products')
    }
}
const isUser = (req, res, next) => {
    if(req.session.user && !req.session.user.admin) {
        next()
    } else {
        res.redirect('/realTimeProducts')
    }
}

viewsRouter.get('/register', sessionMiddleware, (req, res) => {
    try {
      return res.render('register')
    } catch (error) {
      return error
    }
})
  
viewsRouter.get('/login', sessionMiddleware, (req, res) => {
  try {
    return res.render('login')
  } catch (error) {
    return error
  }
})

viewsRouter.get('/recovery-password', sessionMiddleware, (req, res) => {
    return res.render('recovery-password')
})

viewsRouter.get('/profile', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }
    return next()
  }, (req, res) => {
    const user = req.session.user
    return res.render('profile', { user })
})

viewsRouter.get('/products', isUser, (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login')
        }

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

viewsRouter.get('/realtimeproducts', isAdmin, async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }
        const limit = req.query.limit
        const page = req.query.page
        const category = req.query.category || null
        const status = req.query.status || null
        const sort = req.query.sort

        let url = `http://localhost:8080/api/products/realtimeproducts?limit=${limit}&page=${page}&sort=${sort}`
        
        if (category) {
            url = `http://localhost:8080/api/products/realtimeproducts?limit=${limit}&page=${page}&category=${category}&sort=${sort}`
        }
        if (status !== null) {
            url = `http://localhost:8080/api/products/realtimeproducts?limit=${limit}&page=${page}&status=${status}&sort=${sort}`
        }
        if (category & status) {
            url = `http://localhost:8080/api/products/realtimeproducts?limit=${limit}&page=${page}&category=${category}&status=${status}&sort=${sort}`
        }

        const response = await axios.get(url)

        const products = response.data
        const pageNumber = page !== undefined ? parseInt(page) : 1

        if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > products.totalPages) {
            const message = "El numero de pagina no es valido"
            return res.render('errorView', { message })
        }

        res.render('realtimeproducts', { products })
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