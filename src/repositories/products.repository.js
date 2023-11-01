const ProductsDAOMongo = require("../DAOs/productsDAOMongo")

class ProductsRepository {
    constructor() {
        this.dao = new ProductsDAOMongo()
    }

    getAll (filter, params) {
        return this.dao.getAll(filter, params)
    }

    getOne (id) {
        return this.dao.getOne(id)
            .then(product => {
                if (!product) {
                    throw new Error('Producto no encontrado')
                }

                return product
            })
    }

    create (data) {
        return this.dao.create(data)
            .then(product => {
                if (!product) {
                    throw new Error('Producto no agregado')
                }

                return product
            })
    }

    update (id, data) {
        return this.dao.update(id, data)
            .then(product => {
                if (!product) {
                    throw new Error('Producto no actualizado')
                }

                return product
            })
    }

    delete (id) {
        return this.dao.delete(id)
            .then(product => {
                if (!product) {
                    throw new Error('Producto no eliminado')
                }

                return product
            })
    }

    updateStock (productId, newStock) {

      return this.dao.updateStock(productId, newStock)
          .then(productStock => {
              if (!productStock) {
                  throw new Error('Stock no actualizado')
              }
              return productStock
          })
    }
}

module.exports = ProductsRepository