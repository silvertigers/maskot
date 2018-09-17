const router = require('express').Router()
const Orders = require('../db/models/order')
module.exports = router

// /api/guests/orders
router.post('/orders', async (req, res, next) => {
  const sessionId = req.session.id
  const {status, email} = req.body
  try {
    const order = await Orders.create({status, email, sessionId})
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
})
