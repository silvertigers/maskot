/* global describe beforeEach it */
const chai = require('chai')
const {expect} = require('chai')
const db = require('..')
const chaiAsPromised = require('chai-as-promised')
const Reviews = require('./reviews')
chai.use(chaiAsPromised)

describe('Reviews model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  const title = 'My review'
  const comments = `It's super awesome, and I love it!!!!!! I think everyone should but it, and you will not regret it at all!!!!!`
  const rating = 5
  const review = Reviews.build({
    title,
    comments,
    rating
  })

  it('requires userId, productId, title, comments, and rating', async () => {
    const savedReview = await review.save()
    expect(savedReview.title).to.equal(title)
    expect(savedReview.rating).to.equal(rating)
    expect(Reviews.create({})).to.be.rejected
    expect(Reviews.create({title})).to.be.rejected
  })
})
