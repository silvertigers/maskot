const router = require('express').Router()
const Orders = require('../db/models/order')
const {orderedProducts} = require('../db/models')

module.exports = router

// /api/guests/orders
router.post('/orders', async (req, res, next) => {
  const sessionId = req.session.id
  const {status, email} = req.body.order
  const {cart} = req.body
  try {
    const order = await Orders.create({status, email, sessionId})
    await Promise.all(
      cart.map(item => {
        return orderedProducts.create({
          productId: item.product.id,
          price: item.product.price,
          quantity: item.quantity,
          orderId: order.id
        })
      })
    )
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
})
