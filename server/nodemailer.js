const nodemailer = require('nodemailer')
const html = require('html-template-tag')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_SECRET
  }
})

const sendMail = mailOptions => {
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.error(err)
    else console.log(info)
  })
}

const orderConfirmation = (recipientEmail, orderId) => ({
  from: process.env.GMAIL_EMAIL,
  to: recipientEmail,
  subject: `Order confirmation #${orderId} from Maskot`,
  html: html`<h1>You order is being processed</h1>
  <p>Thank you for shopping with Maskot</p>
  <p>405 W. Superior Street, Chicago, IL 60654</p>`
})

const orderShipped = (recipientEmail, orderId) => ({
  from: process.env.GMAIL_EMAIL,
  to: recipientEmail,
  subject: `Order shipped #${orderId} from Maskot`,
  html: html`<h1>Your order is on its way</h1>
  <p>405 W. Superior Street, Chicago, IL 60654</p>`
})

const orderDelivered = (recipientEmail, orderId) => ({
  from: process.env.GMAIL_EMAIL,
  to: recipientEmail,
  subject: `Order delivered #${orderId} from Maskot`,
  html: html`<h1>You order has been delivered</h1>
  <p>Visit us again!</p>
  <p>405 W. Superior Street, Chicago, IL 60654</p>`
})

module.exports = {
  transporter,
  orderConfirmation,
  orderShipped,
  orderDelivered,
  sendMail
}
