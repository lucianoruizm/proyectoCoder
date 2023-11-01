const cartModel = require('../models/cartModels')
const ticketModel = require('../models/ticketModel')
const userModel = require('../models/userModel')
const uuid = require('uuid')
const calculateTotalAmount = require('../utils/calculateTotalAmount')

class CartDAOMongo {
    constructor() {
        this.model = cartModel
        this.userModel = userModel
        this.ticketModel = ticketModel
    }

    getCarts () {
        return this.model.find().populate(products.product)
    }

    async addCart(email) {
        try {
          const newCart = await this.model.create({
            products: []
          })

          const user = await this.userModel.findOne({ email: email })

          let userId

          if (user) {
            userId = user._id

            await this.userModel.updateOne(
              { _id: userId },
              { $set: { cartId: newCart._id } }
            )
            console.log("newCart en DAO", newCart)
            return newCart

          } else {
            return "Usuario no encontrando para agregarle su CART"
          }

        } catch(error) {
            return `Error al crear el cart, ${error}`
        }
    }

    getCartById(id) {
        return this.model.findById(id).populate('products.product')
            .then(cart => {
                if (!cart) {
                    throw new Error('No se encuentra cart por ID: ', id)
                }
                return cart
            })
    }

    getCartToAddProduct(cartId) {
        return this.model.findById(cartId)
        .then(cart => {
            if (!cart) {
                throw new Error('Cart no encontrado')
            }

            return cart
        })
    }

    addOne (cartId, productId) {
        return this.model.updateOne({ _id: cartId }, { $push: { products: {product: productId, quantity: 1} }})
    }

    addQuantity (cartId, productObjectId) {
        return this.model.updateOne(
            { _id: cartId, 'products._id': productObjectId },
            { $inc: { 'products.$.quantity': 1 } }
        )
    }

    updateOneToDeleteProduct (cartId, productObjectId) {
        return this.model.updateOne(
            { _id: cartId },
            { $pull: { products: { _id: productObjectId } }},
        )
    }
    
    updateCart (id, data) {
        return this.model.updateOne({ _id: id}, data)
    }

    updateQuantity (cartId, productId, quantity) {
        return this.model.updateOne(
            {
              _id: cartId,
              'products.product': productId,
            },
            {
              $set: { 'products.$.quantity': quantity}
            }
        )
            .then(update => {
                if (!update) {
                    throw new Error('No se pudo actualizar cantidad del producto')
                }
                return update
            })
    }

    generateTicket (listProducts, userId) {

        return this.ticketModel.create({
          code: uuid.v4(),
          amount: calculateTotalAmount(listProducts),
          purchaser: userId
        })
        .then(ticket => {
            if (!ticket) {
                throw new Error('Ticket no creado')
            }
            return ticket
        })

    }
}

module.exports = CartDAOMongo