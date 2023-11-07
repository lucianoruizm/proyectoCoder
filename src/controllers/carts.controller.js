const CartService = require("../services/cartService")

class CartsController {
    constructor () {
        this.service = new CartService()
    }

    getCarts = async (req, res) => {
        try{
            const getAllCarts = await this.service.getCarts()
            return res.json(getAllCarts)
        } catch (error) {
            req.logger.warning(`Error al obtener CARTS: ${error}`)
            res.send({ message: "Error al obtener CARTS"})
        }
    }

    addCart = async (req, res) => {
        try {
            const email = req.body.email
            console.log("req body email", email)
            const addCart = await this.service.addCart(email)
            return res.send(addCart)
        } catch (error) {
            req.logger.warning(`Error al agregar CART: ${error}`)
            res.send({ message: "Error al agregar CART"})
        }
    }

    getCartById = async (req, res) => {
        try{
            const cartId = req.params.cid
            const getCart = await this.service.getCartById(cartId)
            return res.send(getCart)
        } catch (error) {
            req.logger.warning(`Error al obtener CART por ID: ${error}`)
            res.send({ message: "Error al obtener CART por ID"})
        }
    }

    addProductToCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
        
            const addProductToCart = await this.service.addProductToCart(cartId, productId)
            if(!addProductToCart) {
                return res.status(400).json({ message: 'El producto no esta disponible' });
            }
            return res.send(addProductToCart)
        } catch (error) {
            req.logger.warning(`Error al agregar producto al CART: ${error}`)
            res.send({ message: "Error al agregar producto al CART"})
        }
    }

    deleteProductFromCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
        
            const deleteProductFromCart = await this.service.deleteProductFromCart(cartId, productId)
            return res.send(deleteProductFromCart)
        } catch (error) {
            req.logger.warning(`Error al eliminar producto del CART: ${error}`)
            res.send({ message: "Error al eliminar producto del CART"})
        }
    }

    updateCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const data = req.body
            const updateCart = await this.service.updateCart(cartId, data)
            if (!data) {
                return `No se puede actualizar el cart con ID ${cartId}`
            }
            return res.json(updateCart)

        } catch (error) {
            req.logger.warning(`Error al actualizar CART: ${error}`)
            res.send({ message: "Error al actualizar CART"})
        }
    }

    updateQuantityProducts = async (req, res) => {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const { quantity } = req.body
        
            const updateQuantityProducts = await this.service.updateQuantityProducts(cartId, productId, quantity)
            if (!quantity) {
                return `No se puede actualizar cantidad de productos con ID ${productId} en el cart con ID ${cartId}`
            }
            if (updateQuantityProducts === false) {
                return res.status(400).json({ message: 'No hay suficiente stock disponible' });
            }

            return res.json(updateQuantityProducts)

        } catch (error) {
            req.logger.warning(`Error al actualizar cantidad de productos: ${error}`)
            res.send({ message: "Error al actualizar cantidad de productos"})
        }
    }

    clearCart = async (req, res) => {
        const cartId = req.params.cid
        try {
            const cleanCart = await this.service.clearCart(cartId)
            return res.json(cleanCart)
        } catch (error) {
            req.logger.warning(`Error al vaciar CART: ${error}`)
            return res.status(404).json({
                message: error.message
            })
        }
    }

    buyProducts = async (req, res) => {
        const cartId = req.params.cid
        const listProducts = req.body.products
        const userId = req.user._id

        try {
            const generateTicket = await this.service.generateTicket(listProducts, userId)

            if (generateTicket) {
                const clearCart = await this.service.clearCart(cartId)
                console.log({ message: 'Compra exitosa', ticket: generateTicket , products: listProducts, userId: userId })
                res.status(200).json({ message: 'Compra exitosa', ticket: generateTicket , products: listProducts, userId: userId, clearCart: clearCart });
            } else {
                res.status(400).json({ message: 'No se encuentran productos en el CART para comprar' });
            }
        } catch (error) {
            req.logger.warning(`Error al actualizar cantidad de productos: ${error}`)
            return res.status(404).json({
                message: error.message
            })
        }
    }
}

module.exports = CartsController