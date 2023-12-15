const ProductsRepository = require('../repositories/products.repository')

class ProductsService {
    constructor() {
        this.repository = new ProductsRepository()
    }

    async getProducts (filter, params) {
      try {
        
        const products = await this.repository.getAll(filter, params)

        return products
      } catch (err) {
        return `No se encontraron productos, ${err}`;
      }
    }

    async getProductById(id) {
      try {
        const product = await this.repository.getOne(id);

        console.log('Producto encontrado por ID:', id)
        return product
        
      } catch (e) {
        console.log('Error: ', e);
        return `Error al obtener producto con ID: ${id}`;
      }
    }

    async getProductByCode(code) {
      try {
        const product = await this.repository.getOneByCode(code);

        console.log('Producto encontrado por CODE:', code)
        return product
        
      } catch (e) {
        console.log('Error: ', e);
        return `Error al obtener producto con CODE: ${code}`;
      }
    }
    
    async addProduct(data) {
      try {
        await this.repository.create(data)
        return "Producto agregado correctamente"
      } catch (e) {
        console.log('Error: ', e);
        return false
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

            await this.repository.update({ _id: id}, productUpdated)
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
          const product = await this.getProductById(id);
  
          if (!product) {
            console.log('No se encuentra producto a eliminar con ID:', id)
            return `No se encuentra producto a eliminar con ID: ${id}`
          }

          await this.repository.delete({ _id: id})
          console.log('Producto eliminado con ID:', id)
          return true
        }
        catch (e) {
          console.log('Error al eliminar el producto', e)
          return `Error al eliminar el producto: ${e}`
        }
      }

      async updateProductStock (productId, newStock) {
        try {
          const product = await this.getProductById(productId);
  
          if (!product) {
            console.log('No se encuentra producto para actualizar stock con ID:', productId)
            return `No se encuentra producto para actualizar stock con ID: ${productId}`
          }

          const result = await this.repository.updateStock(productId, newStock)
          return result
        }
        catch (e) {
          console.log('Error al actualizar stock del producto', e)
          return `Error al actualizar stock del producto: ${e}`
        }
      }
}

module.exports = ProductsService;