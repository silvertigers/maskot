/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')

const db = require('../db')
const app = require('../index')
const Products = db.model('products')
const Reviews = db.model('reviews')
const User = db.model('user')

describe('Products routes', () => {

describe('GET /api/products', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  after(() => {
    return Products.truncate({cascade: true})
  })

  it('should return products', async () => {
      const descriptionProduct = 'Ultra kawaii super cute mask'
      await Products.create({
        name: 'Mask01',
        imageUrl: 'Mask.png',
        description: descriptionProduct,
        price: 10
      })
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal('Ultra kawaii super cute mask')
    })
  })

  describe('GET api/products/:productId', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })

    after(() => {
      return Products.truncate({cascade: true})
    })

    it('should return a product with the matching productId and reviews for only that product', async () => {
      const userId = 1
      const title = 'My review'
      const comments = `It's super awesome, and I love it!!!!!!`
      const rating = 5

      const descriptionProduct = 'Ultra kawaii super cute mask'
      const product = await Products.create({
        name: 'Mask01',
        imageUrl: 'Mask.png',
        description: descriptionProduct,
        price: 10
      })
      await User.create({email: 'cody@email.com'})
      await Reviews.create({
        productId: 1,
        userId,
        title,
        comments,
        rating
      })

    const res = await request(app)
      .get(`/api/products/${product.id}`)
      .expect(200)
    expect(res.body.reviews).to.exist
    expect(res.body.reviews[0].title).to.be.equal(title)
    console.log('res.body', res.body.reviews[0].user)
    expect(res.body.reviews[0].user.email).to.be.equal('cody@email.com')
    })
  })

  describe('/api/products/', () => {

    it('Create /api/products', async () => {
      const res = await request(app)
      .post('/api/products')
      .send({
        title: "fancy mask",
        description: "you should buy this",
        price: 3.5,
        imageUrl: "http://www.thisisdummy.com",
        quantity: 10,
      })
      .expect(200)

      expect(res.body.title).to.equal("fancy mask")
      expect(res.body.description).to.equal("you should buy this")
    })
  })

  describe('/api/products/:id', () => {

    let product;

    beforeEach(async () => {
      product = await Products.create({
        title: "fancy mask",
        description: "you should buy this",
        price: 3.5,
        imageUrl: "http://www.thisisdummy.com",
        quantity: 10,
      })
    })

    it('Update /api/products', async () => {
      const res = await request(app)
      .put('/api/products/' + product.id)
      .send({
        title: "Horrable mask",
        description: "you should NOT buy this",
        })
      .expect(200)

      expect(res.body.id).to.not.be.an('undefinded')
      expect(res.body.title).to.equal("Horrable mask")
      expect(res.body.description).to.equal("you should NOT buy this")
  })
})

  describe('/api/products/:id', () => {
    let removedProduct;

    beforeEach(async () => {
      removedProduct = await Products.create({
        title: "fancy mask",
        description: "you should buy this",
        price: 3.5,
        imageUrl: "http://www.thisisdummy.com",
        quantity: 10,
      })
    })

    it('Delete /api/products', async () => {
      const res = await request(app)
      .delete('/api/products/' + removedProduct.id)

      expect(res.body.filter(product => {
        return product.id === removedProduct.id
      }).length).to.equal(0)
    })
  })
})
