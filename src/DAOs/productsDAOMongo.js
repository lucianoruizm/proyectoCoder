const productModel = require("../models/productModels");

class ProductsDAOMongo {
    constructor() {
        this.model = productModel
    }

    // estoy en el getAll
    getAll (filter, params) {
        console.log("getAll en DAO")
        return this.model.paginate(filter, params)
    }

    getOne (id) {
        return this.model.findById(id)
            .then(product => {
                if (!product) {
                    throw new Error('Producto no encontrado')
                }

                return product
            })
    }

    create (data) {
        return this.model.create(
          {
            title: data.title,
            description: data.description,
            price: data.price,
            thumbnail: data.thumbnail,
            code: data.code,
            stock: data.stock,
            status: data.status,
            category: data.category
          }
        )
            .then(product => {
                if (!product) {
                    throw new Error('Producto no agregado')
                }

                return product
            })
    }

    update (id, data) {
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

        return this.model.updateOne({ _id: id}, productUpdated)
            .then(product => {
                if (!product) {
                    throw new Error('Producto no actualizado')
                }

                return product
            })
    }

    delete (id) {
        return this.model.deleteOne({ _id: id})
            .then(product => {
                if (!product) {
                    throw new Error('Producto no eliminado')
                }

                return product
            })
    }

    updateStock (productId, newStock) {

      return this.model.updateOne(
        { _id: productId },
        { $set: { stock: newStock } })
          .then(productStock => {
              if (!productStock) {
                  throw new Error('Stock no actualizado')
              }
              return productStock
          })
    }
}

module.exports = ProductsDAOMongo