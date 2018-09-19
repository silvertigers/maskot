import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'semantic-ui-react'

const OrderCard = props => {
  const date = props.order.createdAt.slice(0, 9)
  return (
    <Card className='order-card'>
      <Card.Content>
        <Link to={`/users/${props.userId}/orders/${props.order.id}`}>
          <Card.Header>Order #{props.order.id}</Card.Header>
        </Link>
        <Card.Meta>
          <span className='date'>Made on {date}</span>
        </Card.Meta>
        <Card.Description>Order status: {props.order.status}</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default OrderCard
