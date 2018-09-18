const router = require('express').Router()
const {order, products, orderedProducts} = require('../db/models')
const {orderConfirmation, sendMail} = require('../nodemailer')

module.exports = router

router.get('/:sessionId/orders/:orderId', async (req, res, next) => {
  try {
    const foundOrder = await order.findOne({
      where: {
        id: req.params.orderId,
        sessionId: req.params.sessionId
      },
      include: {model: products}
    })
    res.json(foundOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/orders', async (req, res, next) => {
  const sessionId = req.session.id
  const {status, email} = req.body.order
  const {cart} = req.body
  try {
    const newOrder = await order.create({status, email, sessionId})
    await Promise.all(
      cart.map(item => {
        return orderedProducts.create({
          productId: item.product.id,
          price: item.product.price,
          quantity: item.quantity,
          orderId: newOrder.id
        })
      })
    )
    const mailOption = orderConfirmation(email, newOrder.id, cart)
    sendMail(mailOption)
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})
