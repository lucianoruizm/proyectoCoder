const ProductsService = require('../services/productsService')

class ProductsController {
    constructor () {
        this.service = new ProductsService()
    }

    getProducts = async (req, res) => {
        console.log("getProducts en controller")
        try {
            const limit = parseInt(req.query.limit) || 5
            const page = parseInt(req.query.page) || 1
            const category = req.query.category || null
            const status = req.query.status || null
            const sort = parseInt(req.query.sort) || null
    
            const params = { limit, page}
            let filter = {}
    
            if(status !== null) {
                filter.status = status
            }
    
            if(category !== null) {
                filter.category = category
            }
    
            if(sort !== null) {
                params.sort = { price: sort}
            }
    
            const getAllProducts = await this.service.getProducts(filter, params)
            console.log(getAllProducts)
            return res.json(getAllProducts)
        } catch(error) {
            console.log("error")
            //res.status(500).send({ status: 'error', message: 'Error al solicitar lista de productos' });
        }
    }

    getProductsAdmin = async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 7
            const page = parseInt(req.query.page) || 1
            const category = req.query.category || null
            const status = req.query.status || null
            const sort = parseInt(req.query.sort) || null
    
            const params = { limit, page}
            let filter = {}
    
            if(status !== null) {
                filter.status = status
            }
    
            if(category !== null) {
                filter.category = category
            }
    
            if(sort !== null) {
                params.sort = { price: sort}
            }
    
            const getAllProducts = await this.service.getProducts(filter, params)
            return res.json(getAllProducts)
        } catch(error) {
            return res.json("Error", error)
        }
    }

    getProductById = async (req, res) => {
        const productId = req.params.pid
        const getProductById = await this.service.getProductById(productId)
        console.log(getProductById)
        if (!getProductById) {
            return res.json(`El producto con el ID ${productId} no existe`)
        }
        return res.json(getProductById)
    }

    addProduct = async (req, res) => {
        const data = req.body
    
        const postProduct = await this.service.addProduct(data)
        
        if (!data) {
            return "El producto no ha podido agregarse"
        }
        return res.status(201).json(postProduct)
    }

    updateProduct = async (req, res) => {
        const productId = req.params.pid
        const data = req.body
        const updateProduct = await this.service.updateProduct(productId, data)
        if (!data) {
            return `No se puede actualizar el producto con ID ${productId}`
        }
        return res.json(updateProduct)
    }

    deleteProduct = async (req, res) => {
        const productId = req.params.pid
        try {
            const deleteProduct = await this.service.deleteProduct(productId)
            return res.json(deleteProduct)
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }

}

module.exports = ProductsController