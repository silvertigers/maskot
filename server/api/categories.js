const router = require('express').Router()
const Products = require('../db/models/products')
const Categories = require('../db/models/category')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Categories.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const category = await Categories.create(req.body)
    res.json(category)
  } catch(err) {
    next(err)
  }
})
