const router = require('express').Router()
const Orders = require('../../db/models/order')
const Products = require('../../db/models/products')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      where: {
        userId: req.userId
      },
      include: {
        model: Products
      }
    })
    res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    req.params.userId = req.userId
    const order = await Orders.findOne({
      where: {
        userId: req.userId,
        id: req.params.orderId
      },
      include: {
        model: Products
      }
    })
    res.status(200).json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {status, email, userId} = req.body
  try {
    const order = await Orders.create({status, email, userId})
    res.json(order)
  } catch (err) {
    next(err)
  }
})
