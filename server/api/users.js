const router = require('express').Router()
const Products = require('../db/models/products')
const Orders = require('../db/models/order')

module.exports = router

// GET all products at /api/users/:userId/orders
router.get('/:userId/orders', async (req, res, next) => {
  try {
    const orders = await Orders.findAll()
    res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
})
