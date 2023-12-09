const { Router } = require('express')
const UsersController = require("../controllers/users.controller")

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.getUsers)
usersRouter.get('/:uid', usersController.getUserById)
usersRouter.put('/:uid', usersController.updateUser)
usersRouter.delete('/:uid', usersController.deleteUser)

module.exports = usersRouter