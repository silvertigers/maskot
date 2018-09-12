/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')

const db = require('../db')
const app = require('../index')
const Products = db.model('products')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
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
