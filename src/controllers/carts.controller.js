const CartManager = require("../dao/managers/CartManager")

class CartsController {
    constructor () {
        this.manager = new CartManager()
    }

    getCarts = async (req, res) => {
        try{
            const getAllCarts = await this.manager.getCarts()
            return res.json(getAllCarts)
        } catch (error) {
            return error
        }
    }

    addCart = async (req, res) => {
        try {
            const email = req.body.email
            console.log("req body email", email)
            const addCart = await this.manager.addCart(email)
            return res.send(addCart)
        } catch (error) {
            return error
        }
    }

    getCartById = async (req, res) => {
        try{
            const cartId = req.params.cid
            const getCart = await this.manager.getCartById(cartId)
            return res.send(getCart)
        } catch (error) {
            return error
        }
    }

    addProductToCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
        
            const addProductToCart = await this.manager.addProductToCart(cartId, productId)
            if(!addProductToCart) {
                return res.status(400).json({ message: 'El producto no esta disponible' });
            }
            return res.send(addProductToCart)
        } catch (error) {
            return error
        }
    }

    deleteProductFromCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
        
            const deleteProductFromCart = await this.manager.deleteProductFromCart(cartId, productId)
            return res.send(deleteProductFromCart)
        } catch (error) {
            return error
        }
    }

    updateCart = async (req, res) => {
        try {
            const cartId = req.params.cid
            const data = req.body
            const updateCart = await this.manager.updateCart(cartId, data)
            if (!data) {
                return `No se puede actualizar el cart con ID ${cartId}`
            }
            return res.json(updateCart)

        } catch (error) {
            return error
        }
    }

    updateQuantityProducts = async (req, res) => {
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const { quantity } = req.body
        
            const updateQuantityProducts = await this.manager.updateQuantityProducts(cartId, productId, quantity)
            if (!quantity) {
                return `No se puede actualizar cantidad de productos con ID ${productId} en el cart con ID ${cartId}`
            }
            if (updateQuantityProducts === false) {
                return res.status(400).json({ message: 'No hay suficiente stock disponible' });
            }

            return res.json(updateQuantityProducts)

        } catch (error) {
            return error
        }
    }

    clearCart = async (req, res) => {
        const cartId = req.params.cid
        try {
            const cleanCart = await this.manager.clearCart(cartId)
            return res.json(cleanCart)
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }

    buyProducts = async (req, res) => {
        const cartId = req.params.cid
        const listProducts = req.body.products
        const userId = req.user._id

        console.log("ID del user en buy products: ", userId)
        console.log("este", listProducts)

        try {
            const generateTicket = await this.manager.generateTicket(listProducts, userId)

            if (generateTicket) {
                const clearCart = await this.manager.clearCart(cartId)
                res.status(200).json({ message: 'Compra exitosa', ticket: generateTicket , products: listProducts, userId: userId, clearCart: clearCart });
            } else {
                res.status(200).json({ message: 'No se encuentran productos en el CART para comprar' });
            }
        } catch (e) {
            return res.status(404).json({
                message: e.message
            })
        }
    }
}

module.exports = CartsController