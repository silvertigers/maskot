/* global describe beforeEach it */

const {expect} = require('chai')
const chai = require('chai')
const db = require('../index')
const Products = db.model('Products')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('Products model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let mask

  beforeEach(async () => {
    mask = await Products.create({
      title: 'perfect mask',
      description: 'You should buy this product',
      price: 3,
      quantity: 10,
    })
  })

  it('rejects null or empty entries', async () => {

    await expect(Products.create({})).to.be.rejected
  })

  it('returns title', () => {
    expect(mask.title).to.be.equal("perfect mask")
  })

  it('returns description', () => {
    expect(mask.description).to.be.equal("You should buy this product")
  })

  it('returns quantity', () => {
    expect(mask.quantity).to.be.equal(10)
  })
})
