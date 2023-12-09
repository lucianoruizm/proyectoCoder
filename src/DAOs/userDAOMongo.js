const userModel = require("../models/userModel");

class UserDAOMongo {
    constructor() {
        this.model = userModel
    }

    getAll (filter, params) {
        console.log("getAll en DAO")
        return this.model.paginate(filter, params)
    }

    getOne (id) {
        return this.model.findById(id)
            .then(user => {
                if (!user) {
                    throw new Error('User no encontrado')
                }

                return user
            })
    }

    update (id, data) {
        const userUpdated = {
            _id: data._id,
            premium: data.premium
        }

        return this.model.updateOne({ _id: id}, userUpdated)
            .then(user => {
                if (!user) {
                    throw new Error('User no actualizado')
                }

                return user
            })
    }

    delete (id) {
        return this.model.deleteOne({ _id: id})
            .then(user => {
                if (!user) {
                    throw new Error('User no eliminado')
                }

                return user
            })
    }
}

module.exports = UserDAOMongo