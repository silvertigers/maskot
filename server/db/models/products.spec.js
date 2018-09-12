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

  it('rejects null or empty entries', async () => {

    await expect(Products.create({})).to.be.rejected
  })
})
