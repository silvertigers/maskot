const router = require('express').Router()
const Order = require('../../db/models/order')
const {user} = require('../../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allOrder = await Order.findAll({
      include:{
        model: user,
      }
    })
    res.json(allOrder)
  } catch(err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId
    const oneOrder = await Order.findById(id)
    res.json(oneOrder)
  } catch(err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId

    await Order.update({
      status: req.body.status
    }, {
      where: {
        id,
      }
    })

    const updatedOrder = await Order.findById(id, {
      include: {
        model: user,
      }
    })
    res.json(updatedOrder)
  } catch(err) {
    next(err)
  }
})
