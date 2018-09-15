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
