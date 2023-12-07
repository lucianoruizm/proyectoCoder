const { Router } = require('express')
const ProductsController = require("../controllers/products.controller")

const productsRouter = Router()
const productsController = new ProductsController()

productsRouter.get('/productsManagement', productsController.getProductsAdmin)
productsRouter.get('/productsPremium', productsController.getProductsPremium)
productsRouter.get('/', productsController.getProducts)
productsRouter.get('/:pid', productsController.getProductById)
productsRouter.post('/', productsController.addProduct)
productsRouter.put('/:pid', productsController.updateProduct)
productsRouter.delete('/:pid', productsController.deleteProduct)

module.exports = productsRouter