import React from 'react'
import { Comment, Header, Card } from 'semantic-ui-react'

const SingleReview = props => {
  const {title, comments, rating, user} = props.review
  return (
    <div id="reviewForm">
    <Card>
      <Card.Content>
    <Comment.Group>
    <Comment>
      <Comment.Content>
        <Comment.Author as='a'>{user.email}</Comment.Author>
        <Comment.Text>{title}</Comment.Text>
        <Comment.Text>{comments}</Comment.Text>
      </Comment.Content>
    </Comment>
    </Comment.Group>
      </Card.Content>
    </Card>
    </div>
  )
}

export default SingleReview
