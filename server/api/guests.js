const router = require('express').Router()
const db = require('../db')
module.exports = router

router.get('/', (req, res, next) => {
  res.json(req.session.id)
})
