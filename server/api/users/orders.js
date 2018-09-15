const router = require('express').Router()
const Orders = require('../../db/models/order')

module.exports = router

router.get('/', async(req, res, next) => {
  try {
    const orders = await Orders.findAll()
    res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
})
