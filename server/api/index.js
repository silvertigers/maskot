const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/category', require('./category'))
router.use('/admin', require('./admin'))
router.use('/guests', require('./guests'))
router.use('/orders', require('./users/orders'))
router.use('/charge', require('./charge'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
