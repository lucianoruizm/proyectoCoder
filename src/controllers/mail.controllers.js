const mail = require('../utils/gmailTransport')
const dotenv = require('dotenv')
const configFn = require('../config')

dotenv.config()
const config = configFn()

class MailController {

    sendMail = async(req, res) => {

        try {
            if (req.body.ticket) {

              await mail.transport.sendMail({
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

            } else if (req.body.title) {

              await mail.transport.sendMail({
                from: `CODER ECOMMERCE ${config.email_account}`,
                to: req.body.owner,
                subject:'AVISO ELIMINACION DE SU PRODUCTO',
                html: mail.generateEmailDeleteProduct(req.body)
              })

            } else {

              await mail.transport.sendMail({
                from: `CODER ECOMMERCE ${config.email_account}`,
                to: config.destination_email,
                subject:'AVISO ELIMINACION DE SU CUENTA',
                html: mail.generateEmailDeleteUser(req.body)
              })
              
            }

            res.send({status: "success", result:"mail enviado"})
            
        } catch (error) {
            req.logger.warning(`Error al enviar email: ${error}`)
            res.status(500).send({ status: 'error', message: 'Error al enviar el correo' });
        }
    }
}

module.exports = MailController