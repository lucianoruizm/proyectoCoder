const nodemailer = require('nodemailer')
const twilio = require('twilio')
const dotenv = require('dotenv')
const configFn = require('../config')

dotenv.config()
const config = configFn()

const TWILIO_ACCOUNT_SID = config.twilio_account_sid
const TWILIO_AUTH_TOKEN = config.twilio_auth_token

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

module.exports = client
