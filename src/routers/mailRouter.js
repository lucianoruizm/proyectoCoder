const express = require('express')
const mailRouter = express.Router()
const MailController = require('../controllers/mail.controllers')

const mailController = new MailController()

mailRouter.post('/', mailController.sendMail)
module.exports = mailRouter