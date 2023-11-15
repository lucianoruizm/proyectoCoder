const { Router } = require('express')
const CartsController = require("../controllers/carts.controller")

const cartRouter = Router()
const cartsController = new CartsController()

cartRouter.get('/', cartsController.getCarts)
cartRouter.post('/', cartsController.addCart)
cartRouter.get('/:cid', cartsController.getCartById)
cartRouter.post('/:cid/product/:pid', cartsController.addProductToCart)
cartRouter.delete('/:cid/product/:pid', cartsController.deleteProductFromCart)
cartRouter.put('/:cid', cartsController.updateCart)
cartRouter.put('/:cid/product/:pid', cartsController.updateQuantityProducts)
cartRouter.delete('/:cid', cartsController.clearCart)
cartRouter.post('/:cid/purchase', cartsController.buyProducts)

module.exports = cartRouter