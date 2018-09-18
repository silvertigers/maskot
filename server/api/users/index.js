const router = require('express').Router()
module.exports = router

router.use('/orders', require('./orders'))

router.use(
  '/:userId/orders',
  function(req, res, next) {
    try {
      req.userId = req.params.userId
      next()
    } catch (err) {
      next(err)
    }
  },
  require('./orders')
)

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
