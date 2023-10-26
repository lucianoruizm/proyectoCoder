const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const configFn = require('../config')

dotenv.config()
const config = configFn()

const transport = nodemailer.createTransport({
    service:'gmail',
    port:587,
    auth:{
      user: config.email_account,
      pass: config.pass_email
    }
})

module.exports = transport