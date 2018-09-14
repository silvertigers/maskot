const router = require('express').Router()
const Products = require('../db/models/products')
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

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const newCategory = await category.create(req.body)
    res.json(newCategory)
  } catch(err) {
    next(err)
  }
})
