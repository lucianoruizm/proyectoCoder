const UsersService = require('../services/usersService')

class UsersController {
    constructor () {
        this.service = new UsersService()
    }

    getUsers = async (req, res) => {
        console.log("getUsers en controller")
        try {
            const limit = parseInt(req.query.limit) || 7
            const page = parseInt(req.query.page) || 1
            const rol = parseInt(req.query.rol) || null
    
            const params = { limit, page}
            let filter = {}

            if(rol !== null || rol === "admin") {
                filter.rol = null
            }
    
            const getAllUsers = await this.service.getUsers(filter, params)
            return res.json(getAllUsers)
        } catch(error) {
            res.send({ message: "Error al obtener USERS"})
        }
    }

    getUserById = async (req, res) => {
        try {
            const userId = req.params.uid
            const getUserById = await this.service.getUserById(userId)
            console.log(getUserById)
            if (!getUserById) {
                return res.json(`El USER con el ID ${userId} no existe`)
            }
            return res.json(getUserById)
        } catch (error) {
            res.send({ message: "Error al obtener USER por ID"})
        }
    }

    updateUser = async (req, res) => {
        try {
            const usertId = req.params.uid
            const data = req.body
            const updateUser = await this.service.updateUser(usertId, data)
            if (!data) {
                return `No se puede actualizar el USER con ID ${usertId}`
            }
            return res.json(updateUser)
        } catch (error) {
            res.send({ message: "Error al actualizar USER"})
        }
    }

    deleteUser = async (req, res) => {
        const userId = req.params.uid
        try {
            const deleteUser = await this.service.deleteUser(userId)
            return res.json(deleteUser)
        } catch (error) {
            return res.status(404).json({
                message: error.message
            })
        }
    }

}

module.exports = UsersController