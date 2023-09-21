const cartModel = require('../dao/models/cartModels')
const ProductManager = require('./ProductController')

const productManager = new ProductManager()

class CartManager {
    constructor() {
        this.model = cartModel
    }

    async getCarts () {
        try {
            const carts = this.model.find().populate('products.product')
            return carts
        } catch (err) {
            return `No se encontro cart, ${err}`
        }
    }

    async addCart() {
        try {
          return this.model.create({
            products: []
          })
        } catch(error) {
            return `Error al crear el cart, ${error}`
        }
    }

    async getCartById(id) {
        try {
          const cart = await this.model.findById(id).populate('products.product')
  
          if (!cart) {
            console.log('No se encuentra cart por ID: ', id);
            return `No se encuentra cart por ID: ${id}`
          }
        
          return cart
  
        } catch (e) {
          console.log('Error: ', e);
          return e;
        }
    }

    async addProductToCart(cartId, productId) {
      try {
        const cart = await this.model.findById(cartId);
        const productExist = await productManager.getProductById(productId)
        console.log(productExist)
        
        if (!cart) {
          return `No se encuentra cart por ID: ${cartId}`
        }

        if (!productExist) {
          return "No se agrego producto al cart porque no existe"
        }

        const productInCart = cart.products.find(item => item.product._id.equals(productId))
        
        if(!productInCart) {
          await this.model.updateOne({ _id: cartId }, { $push: { products: {product: productId, quantity: 1} }})
          return `Producto con ID ${productId} agregado al Cart con ID ${cartId}`
        }

        const productObjectId = productInCart._id
        console.log(productObjectId)

        await this.model.updateOne(
          { _id: cartId, 'products._id': productObjectId },
          { $inc: { 'products.$.quantity': 1 } }
        )
        return "producto agregado al Cart"

      } catch (e) {
        console.log('Error: ', e);
        return e;
      }
    }

    async deleteProductFromCart(cartId, productId) {
      try {
        const cart = await this.model.findById(cartId).populate('products.product')
        const productExist = await productManager.getProductById(productId)

        if (!cart) {
          return `No se encuentra cart por ID: ${cartId}`
        }

        if (!productExist) {
          return "No se elimino producto del cart porque no existe"
        }
        
        const productInCart = cart.products.find(item => item.product._id.equals(productId));

        if(!productInCart) {
          return `El producto con ID ${productId} no se encuentra en el Cart con ID ${cartId}`
        }

        const productObjectId = productInCart._id

        await this.model.updateOne(
          { _id: cartId },
          { $pull: { products: { _id: productObjectId } }},
        )

        console.log('Producto eliminado exitosamente del carrito');
        return "producto eliminado del Cart"

      } catch (e) {
        console.log('Error, no se ha eliminado el producto del cart: ', e);
        return e;
      }
    }
    

    async updateCart (id, data) {
      try {
        const cart = await this.getCartById(id)

        if (!cart) {
          console.log('No se encuentra cart a actualizar con ID:', id)
          return `No se encuentra cart a actualizar con ID: ${id}`
        }

        const cartUpdated = {
          _id: cart._id,
          products: data.products
        }

        await this.model.updateOne({ _id: id}, cartUpdated)
        console.log('Cart actualizado correctamente con ID:', id, data)
        return cartUpdated
      }
      catch (e) {
        console.log('Error al actualizar el cart', e)
        return `Error al actualizar el cart: ${e}`
      }
    }

    async updateQuantityProducts (cartId, productId, quantity) {
      try {
        const cart = await this.getCartById(cartId)
        console.log(" || cart: ", cart)
        console.log("quantity", quantity)

        if (!cart) {
          console.log('No se encuentra cart a actualizar con ID:', id)
          return `No se encuentra cart a actualizar con ID: ${id}`
        }

        const product = await productManager.getProductById(productId)
        
        if (!product) {
          console.log('No se encuentra el producto para actualizar del carrito');
          return 'No se encuentra el producto para actualizar en el carrito';
        }

        const result = await this.model.updateOne(
          {
            _id: cartId,
            'products.product': productId,
          },
          {
            $set: { 'products.$.quantity': quantity}
          }
        )
        
        if (result.modified === 0) {
          return res.status(404).json({ message: 'Cart o Producto no encontrado'})
        }

        console.log('Cart actualizado correctamente con ID:', cartId, quantity)
        return result
      }
      catch (e) {
        console.log('Error al actualizar el cart', e)
        return `Error al actualizar el cart: ${e}`
      }
    }

    async clearCart (cartId) {
      try {
        const cart = await this.getCartById(cartId)

        if (!cart) {
          console.log('No se encuentra cart a actualizar con ID:', cartId)
          return `No se encuentra cart a actualizar con ID: ${cartId}`
        }

        const cartUpdated = {
          _id: cart._id,
          products: []
        }

        await this.model.updateOne({ _id: cartId}, cartUpdated)
        console.log('Cart actualizado correctamente con ID:', cartId)
        return cartUpdated
      }
      catch (e) {
        console.log('Error al actualizar el cart', e)
        return `Error al actualizar el cart: ${e}`
      }
    }
}

module.exports = CartManager