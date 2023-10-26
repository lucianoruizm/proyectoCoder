const express = require('express')
const SMSRouter = express.Router()
const SMSController = require('../controllers/sms.controller')

const smsController = new SMSController()
SMSRouter.get('/:userId/:ticketCode', smsController.sendSMS)

module.exports = SMSRouter