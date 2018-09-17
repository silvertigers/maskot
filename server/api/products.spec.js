/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')

const db = require('../db')
const app = require('../index')
const Products = db.model('products')
const Reviews = db.model('reviews')
const User = db.model('user')
const Catetory = db.model('category')


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
      expect(res.body[0].description).to.be.equal(
        'Ultra kawaii super cute mask'
      )
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
      const comments = `It's super awesome, and I love it!!!!!! I think everyone should but it, and you will not regret it at all!!!!!`
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
      expect(res.body.reviews[0].user.email).to.be.equal('cody@email.com')
    })
  })

  describe('/api/admin/products/', () => {


    it('Create /api/admin/products', async () => {
      const res = await request(app)
        .post('/api/admin/products')
        .send({
          name: 'fancy mask',
          description: 'you should buy this',
          price: 3.5,
          imageUrl: 'http://www.thisisdummy.com',
          quantity: 10,
          categories: []
        })
        .expect(200)

      expect(res.body.name).to.equal('fancy mask')
      expect(res.body.description).to.equal('you should buy this')
    })
  })

  describe('/api/admin/products/:id', () => {
    let product

    beforeEach(async () => {
      product = await Products.create({
        id: 1,
        name: 'fancy mask',
        description: 'first data',
        price: 3.5,
        imageUrl: 'http://www.thisisdummy.com',
        quantity: 10,
        categories: []
      })
    })

    it('Update /api/admin/products', async () => {
      const res = await request(app)
        .put('/api/admin/products/1')
        .send({
          name: 'fancy mask',
          description: 'you should buy this',
          price: 3.5,
          imageUrl: 'http://www.thisisdummy.com',
          quantity: 10,
          categories: []
        })
        .expect(200)

      expect(res.body.id).to.not.be.an('undefined')
      expect(res.body.name).to.equal('fancy mask')
      expect(res.body.description).to.equal('you should buy this')
    })
  })

  describe('/api/admin/products/:id', () => {
    let removedProduct

    beforeEach(async () => {
      removedProduct = await Products.create({
        name: 'fancy mask',
        description: 'you should buy this',
        price: 3.5,
        imageUrl: 'http://www.thisisdummy.com',
        quantity: 10
      })
    })

    it('Delete /api/admin/products', async () => {
      const res = await request(app).delete(
        '/api/admin/products/' + removedProduct.id
      )

      expect(
        res.body.filter(product => {
          return product.id === removedProduct.id
        }).length
      ).to.equal(0)
    })
  })
})
