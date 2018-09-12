const router = require('express').Router()
const Products = require('../db/models/products')
const Reviews = require('../db/models/reviews')
const User = require('../db/models/user')

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
    const product = await Products.findById(req.params.productId, {
      include: [
        {
          model: Reviews,
          where: {
            productId: req.params.productId
          },
          include: [{model: User}]
        }
      ]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})
