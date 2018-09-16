const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET)

// Get the payment token ID submitted by the form:
// const token = request.body.stripeToken // Using Express
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
  } catch (err) {
    next(err)
  }
})
