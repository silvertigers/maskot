const router = require('express').Router()

router.use((req, res, next) => {
  req.user.isAdmin ? next() : res.status(401).send('unauthorized')
})

module.exports = router
