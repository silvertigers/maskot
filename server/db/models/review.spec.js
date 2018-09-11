/* global describe beforeEach it */
const chai = require('chai')
const {expect} = require('chai')
const db = require('../index')
const chaiAsPromised = require('chai-as-promised')
const Review = db.model('Review')
chai.use(chaiAsPromised)

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  const userId = 1
  const productId = 3
  const title = 'My review'
  const comments = `It's super awesome, and I love it!!!!!!`
  const rating = 5
  const review = Review.build({
    userId,
    productId,
    title,
    comments,
    rating
  })

  it('requires userId, productId, title, comments, and rating', async () => {
    const savedReview = await review.save()
    expect(savedReview.title).to.equal(title)
    expect(savedReview.rating).to.equal(rating)
    await expect(Review.create({})).to.be.rejected
    await expect(Review.create({userId: 10})).to.be.rejected
  })
})
