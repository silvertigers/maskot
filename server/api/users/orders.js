const router = require('express').Router()
const Products = require('../../db/models/products')
const Orders = require('../../db/models/order')

module.exports = router

// GET all products at /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll({ include: { model: Products }})
    res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
})
