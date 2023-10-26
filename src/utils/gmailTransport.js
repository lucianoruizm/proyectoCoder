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
          <p><b>ID Usuario:</b> ${ticketInfo.userId}</p>
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

module.exports = { transport, generateEmailBody }