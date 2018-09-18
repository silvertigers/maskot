import React from 'react'
import {Link} from 'react-router-dom'
import {AddToCart} from './index'

const OrderCard = props => {
  return (
    <li>
      <Link to={`orders/${props.order.id}`}>
        <h3>Order #{props.order.id}</h3>
      </Link>
      <h3>Date: {props.order.createdAt}</h3>
      <p>Status: {props.order.status}</p>
    </li>
  )
}

export default OrderCard
