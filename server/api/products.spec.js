/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Products = db.model('Products')

describe('GET /api/products/', () => {
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
      price: '10000'
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

  it('should return a product with the matching productId', async () => {
    const descriptionProduct = 'Ultra kawaii super cute mask'
    await Products.create({
      id: 10,
      name: 'Mask01',
      imageUrl: 'Mask.png',
      description: descriptionProduct,
      price: '10000'
    })
    const res = await request(app)
      .get('/api/products')
      .expect(200)

    expect(res.body[0].id).to.be.equal(10)
  })
})
