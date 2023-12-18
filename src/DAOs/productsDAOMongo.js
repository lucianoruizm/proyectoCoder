const productModel = require("../models/productModels");

class ProductsDAOMongo {
    constructor() {
        this.model = productModel
    }

    getAll (filter, params) {
        console.log("getAll en DAO")
        if (filter.owner) {
            filter.$or = [
                { owner: null },
                { owner: { $ne: filter.owner } }
            ]
            delete filter.owner
        }
        return this.model.paginate(filter, params)
    }

    getAllPremium (filter, params) {
        console.log("getAllPremium en DAO")
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

    getOneByCode (code) {
        return this.model.findOne(code)
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
            category: data.category,
            owner: data.owner
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
            _id: data._id,
            title: data.title,
            description: data.description,
            price: data.price,
            thumbnail: data.thumbnail,
            code: data.code,
            stock: data.stock,
            status: data.status,
            category: data.category
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