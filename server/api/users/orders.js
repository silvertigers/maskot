const router = require('express').Router()
const Orders = require('../../db/models/order')
const Products = require('../../db/models/products')
const {orderedProducts} = require('../../db/models')

module.exports = router

// /api/users/orders

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
  const {status, email, userId} = req.body.order
  const {cart} = req.body
  try {
    const order = await Orders.create({status, email, userId})
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
