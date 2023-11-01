const CartDAOMongo = require("../DAOs/cartDAOMongo")

class CartRepository {
    constructor() {
        this.dao = new CartDAOMongo()
    }

    getCarts () {
        return this.dao.getCarts()
    }

    addCart(email) {
        try {
          const newCart = this.dao.addCart(email)
          console.log("New cart en REPOSITORY")
          return newCart

        } catch(error) {
            return `Error al crear el cart, ${error}`
        }
    }

    getCartById(id) {
        return this.dao.getCartById(id)
            .then(cart => {
                if (!cart) {
                    throw new Error('No se encuentra cart por ID: ', id)
                }
                return cart
            })
    }

    getCartToAddProduct(cartId) {
        return this.dao.getCartToAddProduct(cartId)
        .then(cart => {
            if (!cart) {
                throw new Error('Cart no encontrado')
            }

            return cart
        })
    }

    addOne (cartId, productId) {
        return this.dao.addOne(cartId, productId)
    }

    addQuantity (cartId, productObjectId) {
        return this.dao.addQuantity(cartId, productObjectId)
    }

    updateOneToDeleteProduct (cartId, productObjectId) {
        return this.dao.updateOneToDeleteProduct(cartId, productObjectId)
    }
    
    updateCart (id, data) {
        return this.dao.updateCart(id, data)
    }

    updateQuantity (cartId, productId, quantity) {
        return this.dao.updateQuantity(cartId, productId, quantity)
            .then(update => {
                if (!update) {
                    throw new Error('No se pudo actualizar cantidad del producto')
                }
                return update
            })
    }

    generateTicket (listProducts, userId) {

        return this.dao.generateTicket(listProducts, userId)
          .then(ticket => {
            if (!ticket) {
                throw new Error('Ticket no creado')
            }
            return ticket
        })

    }
}

module.exports = CartRepository