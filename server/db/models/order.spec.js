/* global describe beforeEach it */

const {expect} = require('chai')
const chai = require('chai')
const db = require('../index')
const Orders = db.model('order')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let mask

  beforeEach(async () => {
    mask = await Orders.create({
      status: 'order placed',
      email: 'silver@myfirst.com',
    })
  })

  it('rejects null or empty entries', async () => {
    await expect(Orders.create({})).to.be.rejected
  })

  it('returns status', () => {
    expect(mask.status).to.be.equal('order placed')
  })

  it('returns id', () => {
    expect(mask.id).to.be.equal(1)
  })
})
