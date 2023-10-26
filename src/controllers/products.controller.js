const ProductManager = require("../dao/ProductManager")

class ProductsController {
    constructor () {
        this.manager = new ProductManager()
    }

    getProducts = async (req, res) => {
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
    
            const getAllProducts = await this.manager.getProducts(filter, params)
            return res.json(getAllProducts)
        } catch(error) {
            return res.json("Error", error)
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
    
            const getAllProducts = await this.manager.getProducts(filter, params)
            return res.json(getAllProducts)
        } catch(error) {
            return res.json("Error", error)
        }
    }

    getProductById = async (req, res) => {
        const productId = req.params.pid
        const getProductById = await this.manager.getProductById(productId)
        console.log(getProductById)
        if (!getProductById) {
            return res.json(`El producto con el ID ${productId} no existe`)
        }
        return res.json(getProductById)
    }

    addProduct = async (req, res) => {
        const data = req.body
    
        const postProduct = await this.manager.addProduct(data)
        
        if (!data) {
            return "El producto no ha podido agregarse"
        }
        return res.status(201).json(postProduct)
    }

    updateProduct = async (req, res) => {
        const productId = req.params.pid
        const data = req.body
        const updateProduct = await this.manager.updateProduct(productId, data)
        if (!data) {
            return `No se puede actualizar el producto con ID ${productId}`
        }
        return res.json(updateProduct)
    }

    deleteProduct = async (req, res) => {
        const productId = req.params.pid
        try {
            const deleteProduct = await this.manager.deleteProduct(productId)
            return res.json(deleteProduct)
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }

}

module.exports = ProductsController