const productModel = require('../models/productModels')

class ProductManager {
    constructor() {
        this.model = productModel
    }

    async getProducts (filter, params) {
      try {

        const products = await this.model.paginate(filter, params)

        return products
      } catch (err) {
        return `No se encontraron productos, ${err}`;
      }
    }

    async getProductById(id) {
      try {
        const product = await this.model.findById(id);
        
        // if (!product) {
        //   console.log(`No hay producto con ID: ${id}`)
        //   return product
        // }

        console.log('Producto encontrado por ID:', id)
        return product
        
      } catch (e) {
        console.log('Error: ', e);
        return `Error al obtener producto con ID: ${id}`;
      }
    }
    
    async addProduct(data) {
      try {
        await this.model.create({
          title: data.title,
          description: data.description,
          price: data.price,
          thumbnail: data.thumbnail,
          code: data.code,
          stock: data.stock,
          status: data.status,
          category: data.category
        })
        return "Producto agregado correctamente"
      } catch (e) {
        console.log('Error: ', e);
        return "Error al agregar producto";
      }
    }

    async updateProduct (id, data) {
          try {
            const product = await this.getProductById(id)
    
            if (!product) {
              console.log('No se encuentra producto a actualizar con ID:', id)
              return `No se encuentra producto a actualizar con ID: ${id}`
            }

            const productUpdated = {
              _id: product._id,
              title: data.title || product.code,
              description: data.description || product.description,
              price: data.price || product.price,
              thumbnail: data.thumbnail || product.thumbnail,
              code: data.code || product.code,
              stock: data.stock || product.stock,
              status: data.status || product.status,
              category: data.category || product.category
            }

            await this.model.updateOne({ _id: id}, productUpdated)
            console.log('Producto actualizado correctamente con ID:', id, data)
            return productUpdated
          }
          catch (e) {
            console.log('Error al actualizar el producto', e)
            return `Error al actualizar el producto: ${e}`
          }
      }

      async deleteProduct (id) {
        try {
          const product = await this.model.findById(id);
  
          if (!product) {
            console.log('No se encuentra producto a eliminar con ID:', id)
            return `No se encuentra producto a eliminar con ID: ${id}`
          }

          await this.model.deleteOne({ _id: id})
          console.log('Producto eliminado con ID:', id)
          return true
        }
        catch (e) {
          console.log('Error al eliminar el producto', e)
          return `Error al eliminar el producto: ${e}`
        }
    }
}

module.exports = ProductManager;