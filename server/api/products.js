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

router.post('/', async (req, res, next) => {
  try {
    const name = req.body.name
    const description = req.body.description
    const price = req.body.price
    const imageUrl = req.body.imageUrl
    const quantity = req.body.quantity

    const data = {name, description, price, imageUrl, quantity}

    const products = await Products.create(data)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId

    const name = req.body.name
    const description = req.body.description
    const price = req.body.price
    const imageUrl = req.body.imageUrl
    const quantity = req.body.quantity

    const data = {name, description, price, imageUrl, quantity}

    await Products.update(data, {
      where: {
        id
      }
    })

    const editProduct = await Products.findById(id)
    res.json(editProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId

    await Products.destroy({
      where: {
        id
      }
    })

    const removedProduct = await Products.findAll()

    res.json(removedProduct)
  } catch (err) {
    next(err)
  }
})
