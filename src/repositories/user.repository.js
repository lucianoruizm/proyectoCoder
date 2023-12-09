const UserDAOMongo = require("../DAOs/userDAOMongo")

class UserRepository {
    constructor() {
        this.dao = new UserDAOMongo()
    }

    getAll (filter, params) {
        return this.dao.getAll(filter, params)
    }

    getOne (id) {
        return this.dao.getOne(id)
            .then(user => {
                if (!user) {
                    throw new Error('User no encontrado')
                }

                return user
            })
    }

    update (id, data) {
        return this.dao.update(id, data)
            .then(user => {
                if (!user) {
                    throw new Error('User no actualizado')
                }

                return user
            })
    }

    delete (id) {
        return this.dao.delete(id)
            .then(user => {
                if (!user) {
                    throw new Error('User no eliminado')
                }

                return user
            })
    }
}

module.exports = UserRepository