const router = require('express').Router()
const category = require('../db/models/category')


module.exports = router

// GET all products at /api/categories
router.get('/', async (req, res, next) => {
  try {
    const products = await category.findAll()
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})
