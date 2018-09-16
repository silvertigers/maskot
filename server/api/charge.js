const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET)

// Get the payment token ID submitted by the form:
// const token = request.body.stripeToken // Using Express
<<<<<<< HEAD
router.post('/', (req, res, next) => {
  try {
    const {status} = stripe.charges.create({
      amout: 100,
      currency: 'usd',
      description: 'Example charge',
      source: req.body,
      metadata: {}
    })
    res.json(status)
=======

const charge = req => {
  const token = req.body.stripeToken
  return stripe.charges.create({
    amount: parseInt(process.env.STRIPE_COST, 10),
    currency: process.env.STRIPE_CCY,
    source: token,
    description: 'My Book',
    metadata: {}
  })
}

router.post('/', (req, res, next) => {
  try {
    const {data} = charge(req)
    res.end()
>>>>>>> feature-visitor-checkout-30
  } catch (err) {
    next(err)
  }
})
