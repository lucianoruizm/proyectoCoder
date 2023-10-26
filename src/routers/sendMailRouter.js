const express = require('express')
const transport = require('../utils/gmailTransport')
const dotenv = require('dotenv')
const configFn = require('../config')

dotenv.config()
const config = configFn()

const sendMailRouter = express.Router()

sendMailRouter.post('/', async(req, res) => {
    try {
        let result = await transport.sendMail({
          from: `CODER ECOMMERCE ${config.email_account}`,
          to: config.destination_email,
          subject:'TICKET DE COMPRA',
          html: generateEmailBody(req.body),
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
})

const generateEmailBody = (ticketInfo) => {
    const productsHTML = ticketInfo.products.map(product => `
        <tr>
            <td>${product.product.title}</td>
            <td>${product.product.description}</td>
            <td>$${product.product.price}</td>
            <td>${product.quantity}</td>
        </tr>
    `).join('')

    return `
        <div>
            <h1>Su compra se ha realizado exitosamente!</h1>
            <p><b>Código de Ticket:</b> ${ticketInfo.ticket.code}</p>
            <p><b>Monto Total:</b>$${ticketInfo.ticket.amount}</p>
            <p><b>Fecha y Hora de Compra:</b> ${ticketInfo.ticket.purchase_datetime}</p>
            <p><b>ID Usuario:</b> ${ticketInfo.ticket._id}</p>
            <table>
                <tr>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                </tr>
                ${productsHTML}
            </table>
            <img src="cid:logo"/>
        </div>
    `
}

module.exports = sendMailRouter