const {expect} = require('chai')
const request = require('supertest')

const db = require('../../db')
const app = require('../..')
const Products = db.model('products')
const Orders = db.model('order')

describe('Orders routes', () => {
  describe('GET /api/users/:userid/orders', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })

    after(() => {
      return Orders.truncate({cascade: true})
    })

    it('should return orders', async () => {
      await Orders.create({
        id: 1,
        status: 'order placed',
        email: 'cody@email.com',
      })
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].status).to.be.equal(
        'order placed'
      )
    })
  })
})
