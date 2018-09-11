const router = require('express').Router()
const Products = require('../db/models/products')

module.exports = router

// GET all products at /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll()
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Products.findOne({
      where: {
        id: req.params.productId
      }
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})
