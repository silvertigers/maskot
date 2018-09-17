const router = require('express').Router()
const {user} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await user.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
