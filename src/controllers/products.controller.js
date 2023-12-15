const CustomError = require('../services/errors/customError')
const EErrors = require('../services/errors/enums')
const generateProductErrorInfo = require('../services/errors/info')
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
            const owner = req.query.owner || null
            const sort = parseInt(req.query.sort) || null
    
            const params = { limit, page}
            let filter = {}
    
            if(status !== null) {
                filter.status = status
            }
    
            if(category !== null) {
                filter.category = category
            }

            if(owner !== null) {
                filter.owner = null
            }
    
            if(sort !== null) {
                params.sort = { price: sort}
            }
    
            const getAllProducts = await this.service.getProducts(filter, params)
            return res.json(getAllProducts)
        } catch(error) {
            req.logger.warning(`Error al obtener PRODUCTS: ${error}`)
            res.send({ message: "Error al obtener PRODUCTS"})
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
            req.logger.warning(`Error al obtener PRODUCTS: ${error}`)
            res.send({ message: "Error al obtener PRODUCTS"})
        }
    }

    getProductsPremium = async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 7
            const page = parseInt(req.query.page) || 1
            const category = req.query.category || null
            const status = req.query.status || null
            const owner = req.query.owner
            const sort = parseInt(req.query.sort) || null
    
            const params = { limit, page }
            let filter = {}
    
            if(status !== null) {
                filter.status = status
            }
    
            if(category !== null) {
                filter.category = category
            }

            filter.owner = owner
    
            if(sort !== null) {
                params.sort = { price: sort}
            }
    
            const getAllProducts = await this.service.getProducts(filter, params)
            return res.json(getAllProducts)
        } catch(error) {
            req.logger.warning(`Error al obtener PRODUCTS: ${error}`)
            res.send({ message: "Error al obtener PRODUCTS"})
        }
    }

    getProductById = async (req, res) => {
        try {
            const productId = req.params.pid
            const getProductById = await this.service.getProductById(productId)
            console.log(getProductById)
            if (!getProductById) {
                return res.json(`El producto con el ID ${productId} no existe`)
            }
            return res.json(getProductById)
        } catch (error) {
            req.logger.warning(`Error al obtener PRODUCT por ID: ${error}`)
            res.send({ message: "Error al obtener PRODUCT por ID"})
        }
    }

    getProductByCode = async (req, res) => {
        try {
            const productCode = req.params.code
            const getProductByCode = await this.service.getProductByCode(productCode)
            console.log(getProductByCode)
            if (!getProductByCode) {
                return res.json(`El producto con el CODE ${productCode} no existe`)
            }
            return res.json(getProductByCode)
        } catch (error) {
            req.logger.warning(`Error al obtener PRODUCT por CODE: ${error}`)
            res.send({ message: "Error al obtener PRODUCT por CODE"})
        }
    }

    addProduct = async (req, res) => {
        try {
            let data = req.body
            const isUserPremium = req.user.premium
            const userEmail = req.user.email

            if (isUserPremium) {
                data.owner = userEmail
            }
        
            const postProduct = await this.service.addProduct(data)
    
            if (!data || !postProduct) {
                const customError = CustomError.createError({
                    name: 'Product Creation Error',
                    cause: generateProductErrorInfo(( {data} )),
                    message: 'Error trying to create product',
                    code: EErrors.INVALID_TYPES_ERROR
                })
                return res.status(400).json({ error: customError.message, causa: customError.cause})
            }
    
            return res.status(201).json(postProduct)
        } catch (error) {
            req.logger.warning(`Error al agregar PRODUCT: ${error}`)
            res.send({ message: "Error al agregar PRODUCT"})
        }
    }

    updateProduct = async (req, res) => {
        try {
            const productId = req.params.pid
            const data = req.body
            const updateProduct = await this.service.updateProduct(productId, data)
            if (!data) {
                return `No se puede actualizar el producto con ID ${productId}`
            }
            return res.json(updateProduct)
        } catch (error) {
            req.logger.warning(`Error al actualizar PRODUCT: ${error}`)
            res.send({ message: "Error al actualizar PRODUCT"})
        }
    }

    deleteProduct = async (req, res) => {
        const productId = req.params.pid
        try {
            const deleteProduct = await this.service.deleteProduct(productId)
            return res.json(deleteProduct)
        } catch (error) {
            req.logger.warning(`Error al eliminar PRODUCT: ${error}`)
            return res.status(404).json({
                message: error.message
            })
        }
    }

}

module.exports = ProductsController