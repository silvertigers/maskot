const router = require('express').Router()
const category = require('../../db/models/category')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const newCategory = await category.create(req.body)
    res.json(newCategory)
  } catch(err) {
    next(err)
  }
})
