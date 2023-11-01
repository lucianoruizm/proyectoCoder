const ProductsService = require('./productsService')
const CartRepository = require('../repositories/cart.repository')

const productsService = new ProductsService()

class CartService {
    constructor() {
        this.repository = new CartRepository()
    }

    async getCarts () {
        try {
            const carts = this.repository.getCarts()
            return carts
        } catch (err) {
            return `No se encontro cart, ${err}`
        }
    }

    async addCart(email) {
        try {
          const newCart = await this.repository.addCart(email)
          if (newCart) {
            return newCart
          } else {
            return "No se pudo añadir CART"
          }

        } catch(error) {
            return `Error al crear el cart, ${error}`
        }
    }

    async getCartById(id) {
        try {
          const cart = await this.repository.getCartById(id)
  
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
        const cart = await this.repository.getCartToAddProduct(cartId)
        const productExist = await productsService.getProductById(productId)

        if (!productExist.status || productExist.stock < 1) {
          console.log(`No se puede agregar un producto status: FALSE`)
          return false
        }
        
        if (!cart) {
          return `No se encuentra cart por ID: ${cartId}`
        }

        if (!productExist) {
          return "No se agrego producto al cart porque no existe"
        }

        const productInCart = cart.products.find(item => item.product._id.equals(productId))
        
        if(!productInCart) {
          await this.repository.addOne(cartId, productId)
          return `Producto con ID ${productId} agregado al Cart con ID ${cartId}`
        }

        const productObjectId = productInCart._id

        await this.repository.addQuantity(cartId, productObjectId)
        return "producto agregado al Cart"

      } catch (e) {
        console.log('Error: ', e);
        return e;
      }
    }

    async deleteProductFromCart(cartId, productId) {
      try {
        const cart = await this.repository.getCartById(cartId)
        const productExist = await productsService.getProductById(productId)

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

        await this.repository.updateOneToDeleteProduct(cartId, productObjectId)

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

        await this.repository.updateCart(id, cartUpdated)
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

        if (!cart) {
          console.log('No se encuentra cart a actualizar con ID:', id)
          return `No se encuentra cart a actualizar con ID: ${id}`
        }

        const product = await productsService.getProductById(productId)
        
        if (!product) {
          console.log('No se encuentra el producto para actualizar del carrito');
          return 'No se encuentra el producto para actualizar en el carrito';
        }

        const newQuantity = parseInt(quantity)
        
        if (newQuantity > product.stock) {
          console.log("No hay suficiente stock disponible")
          return false
        }

        const result = await this.repository.updateQuantity(cartId, productId, quantity)
        
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
          console.log('No se encuentra cart a vaciar con ID:', cartId)
          return `No se encuentra cart a vaciar con ID: ${cartId}`
        }

        const cartUpdated = {
          _id: cart._id,
          products: []
        }

        await this.repository.updateCart({ _id: cartId}, cartUpdated)
        console.log('Cart vacio con ID:', cartId)
        return cartUpdated
      }
      catch (e) {
        console.log('Error al vaciar el cart', e)
        return `Error al vaciar el cart: ${e}`
      }
    }

    async generateTicket (listProducts, userId) {
      
      try {
        if (!listProducts || listProducts.length === 0) {
          console.log('No se encuentran productos para comprar')
          return false
        }

        const ticket = await this.repository.generateTicket(listProducts, userId)

        if(!ticket) {
          console.log("Error al generar ticket de compra")
          return false
        }
        
        for (const product of listProducts) {
          const productId = product.product._id
          const quantity = product.quantity
          const stock = product.product.stock
          const updatedStock = stock - quantity

          await productsService.updateProductStock(productId, updatedStock)
        }
        
        return ticket
      }
      catch (e) {
        console.log(`Error al comprar producto/s: ${e}`)
        return false
      }
    }
}

module.exports = CartService