const router = require('express').Router()
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
  } catch (err) {
    next(err)
  }
})

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
  } catch (err) {
    next(err)
  }
})
