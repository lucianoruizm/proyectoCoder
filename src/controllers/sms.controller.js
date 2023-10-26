const client = require('../utils/twilioMessages')
const dotenv = require('dotenv')
const configFn = require('../config')

dotenv.config()
const config = configFn()

const TWILIO_SMS_NUMBER = config.twilio_sms_number
const TWILIO_SMS_DESTINATION_NUMBER = config.twilio_sms_destination_number

class SMSController {
    sendSMS = async(req, res) => {

        const userId = req.params.userId
        const ticketCode = req.params.ticketCode
        
        try {
            let result = await client.messages.create({
              body: `Compra realizada en CODERECOMMERCE. ID de usuario: ${userId}, codigo de ticket: ${ticketCode}`,
              from: TWILIO_SMS_NUMBER,
              to: TWILIO_SMS_DESTINATION_NUMBER
            })
            res.send({status: "success", result:"sms enviado"})
        
            console.log("BODY en SMS")
        } catch (error) {
            console.error('Error al enviar el sms:', error);
            res.status(500).send({ status: 'error', message: 'Error al enviar el sms' });
        }
    }
}

module.exports = SMSController
