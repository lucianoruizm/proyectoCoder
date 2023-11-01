const mail = require('../utils/gmailTransport')
const dotenv = require('dotenv')
const configFn = require('../config')

dotenv.config()
const config = configFn()

class MailController {

    sendMail = async(req, res) => {
        try {
            let result = await mail.transport.sendMail({
              from: `CODER ECOMMERCE ${config.email_account}`,
              to: config.destination_email,
              subject:'TICKET DE COMPRA',
              html: mail.generateEmailBody(req.body),
              attachments:[{
                filename:'coder-ecommerce-logo',
                path:'src/assets/coder-ecommerce-logo.PNG',
                cid: 'logo'
              }]
            })
            res.send({status: "success", result:"mail enviado"})
        
            console.log("BODY en MAIL", req.body)
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).send({ status: 'error', message: 'Error al enviar el correo' });
        }
        // console.log("GMAIL: ")
        // console.log(req.body)
    }
}

module.exports = MailController