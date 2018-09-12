import React from 'react'

const SingleReview = props => {
  const {title, comments, rating, user} = props.review
  return (
    <div className="review-card">
      <div className="review-rating">{rating}</div>
      <div className="review-title">{title}</div>
      <div className="review-user">{user.name}</div>
      <div className="review-comments">{comments}</div>
    </div>
  )
}

export default SingleReview
