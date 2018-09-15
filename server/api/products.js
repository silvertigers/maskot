const router = require('express').Router()
const Products = require('../db/models/products')
const Reviews = require('../db/models/reviews')
const User = require('../db/models/user')
const Categories = require('../db/models/category')

module.exports = router


// GET all products at /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll({include: {model: Categories}})
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
          include: [
            {
              model: User
            }
          ]
        },{
          model: Categories,
          attributes: ['id']
        }
      ]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})