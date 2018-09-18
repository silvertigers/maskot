const nodemailer = require('nodemailer')
const html = require('html-template-tag')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_SECRET
  }
})

const orderConfirmation = (recipientEmail, orderId, products) => ({
  from: process.env.GMAIL_EMAIL,
  to: recipientEmail,
  subject: `Order confirmation #${orderId} from Maskot`,
  html: html`<h1>You order is being processed</h1>
    <h2>Summar</h2>
    <table>
    <tbody>
    <tr><th>Product</th></tr>
    <tr><th>Price</th></tr>
    <tr><th>Quantity</th></tr>
    ${products
      .map(item => {
        return html`<tr><td>${item.product.name}</td></tr>
        <tr><td>${item.product.price}</td></tr>
        <tr><td>${item.quantity}</td></tr>`
      })
      .join('')}
    <h2>Order total: ${products.reduce((total, item) => {
      return total + item.product.price
    }, 0)}</h2>
    </tbody>
    </table>
  `
})

const orderShipped = (recipientEmail, orderId) => ({
  from: process.env.GMAIL_EMAIL,
  to: recipientEmail,
  subject: `Order shipped #${orderId} from Maskot`,
  html: '<h1>Your order is one its way</h1>'
})

const orderDelivered = (recipientEmail, orderId) => ({
  from: process.env.GMAIL_EMAIL,
  to: recipientEmail,
  subject: `Order delivered #${orderId} from Maskot`,
  html: '<h1>You order has been delivered</h1>'
})

const sendMail = mailOptions => {
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.error(err)
    else console.log(info)
  })
}

module.exports = {
  transporter,
  orderConfirmation,
  orderShipped,
  orderDelivered,
  sendMail
}
