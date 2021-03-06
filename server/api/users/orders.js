const router = require('express').Router()
const Orders = require('../../db/models/order')
const Products = require('../../db/models/products')
const {orderedProducts} = require('../../db/models')
const {orderConfirmation, sendMail} = require('../../nodemailer')

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
    console.log('this is req.user!', req.user.dataValues.id)
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
    console.log(req.body)
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
    const {id} = order
    const mailOptions = orderConfirmation(email, id)
    sendMail(mailOptions)
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
})
