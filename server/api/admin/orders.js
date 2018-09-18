const router = require('express').Router()
const Order = require('../../db/models/order')
const {user} = require('../../db/models')
const {orderShipped, orderDelivered, sendMail} = require('../../nodemailer')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allOrder = await Order.findAll({
      include: {
        model: user
      }
    })
    res.json(allOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId
    const oneOrder = await Order.findById(id)
    res.json(oneOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  let mailOptions
  try {
    const id = req.params.orderId

    const [, [{email}]] = await Order.update(
      {
        status: req.body.status
      },
      {
        where: {
          id
        },
        returning: true
      }
    )

    const updatedOrder = await Order.findById(id, {
      include: {
        model: user
      }
    })

    if (req.body.status === 'processing') {
      mailOptions = orderShipped(email)
      sendMail(mailOptions)
    } else if (req.body.status === 'completed') {
      mailOptions = orderDelivered(email)
      sendMail(mailOptions)
    }
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})
