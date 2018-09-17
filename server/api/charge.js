const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const status = await stripe.charges.create(req.body)
    res.status(201).json({status})
  } catch (err) {
    next(err)
  }
})
