const { Router } = require('express')
const CartsController = require("../controllers/carts.controller")

const cartRouter = Router()
const cartsController = new CartsController()

cartRouter.get('/', cartsController.getCarts)
cartRouter.post('/', cartsController.addCart)
cartRouter.get('/:cid', cartsController.getCartById)
cartRouter.post('/:cid/product/:pid', cartsController.addProductToCart)
cartRouter.delete('/:cid/products/:pid', cartsController.deleteProductFromCart)
cartRouter.put('/:cid', cartsController.updateCart)
cartRouter.put('/:cid/products/:pid', cartsController.updateQuantityProducts)
cartRouter.delete('/:cid', cartsController.clearCart)

module.exports = cartRouter