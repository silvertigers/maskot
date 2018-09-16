const router = require('express').Router()
const Products = require('../../db/models/products')
const Reviews = require('../../db/models/reviews')
const User = require('../../db/models/user')
const Categories = require('../../db/models/category')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const name = req.body.name
    const description = req.body.description
    const price = req.body.price
    const imageUrl = req.body.imageUrl
    const quantity = req.body.quantity

    const data = {name, description, price, imageUrl, quantity}

    const products = await Products.create(data)

    req.body.categories.forEach(id => {
      return products.addCategories(id)
    })

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

    const editProduct = await Products.findById(id, {
      include: [{
        model: Categories,
        attributes: ['id']
      }]
    })
    await editProduct.removeCategories(editProduct.categories);

    req.body.categories.forEach(id => {
      return editProduct.addCategories(id)
    })

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
