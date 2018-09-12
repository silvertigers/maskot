const router = require('express').Router()
<<<<<<< HEAD
const {Products} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const quantity = req.body.quantity;

    const data = { title, description, price, imageUrl, quantity }

    const products = await Products.create(data)
    res.json(products)
  } catch (err) {
    next(err)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const quantity = req.body.quantity;

    const data = { title, description, price, imageUrl, quantity };

    await Products.update(data, {
      where: {
        id,
      }
    });

    const editProduct = await Products.findById(id);
    res.json(editProduct)
=======
const Products = require('../db/models/products')
const Reviews = require('../db/models/reviews')
const User = require('../db/models/user')

module.exports = router

// GET all products at /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll()
    res.status(200).json(products)
>>>>>>> master
  } catch (err) {
    next(err)
  }
})

<<<<<<< HEAD
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    await Products.destroy({
      where: {
        id,
      }
    })

    const removedProduct = await Products.findAll()

    res.json(removedProduct)
=======
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
>>>>>>> master
  } catch (err) {
    next(err)
  }
})
