import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import LineItem from './LineItem'

const orderTotal = cart =>
  cart.reduce(
    (total, item) => total + item.product.price * item.quantity / 100,
    0
  )
const quantityTotal = cart =>
  cart.reduce((total, item) => total + item.quantity, 0)

export const Cart = props => {
  return props.cart[0] ? (
    <div id="cart">
      <h1>Shopping Cart</h1>
      <h3>Items ({quantityTotal(props.cart)})</h3>
      <ul className="line-items">
        {props.cart.map(item => <LineItem key={item.product.id} {...item} />)}
      </ul>
      <div className="order-total">
        <h2>{`$ ${orderTotal(props.cart).toFixed(2)}`}</h2>
        <p>Total</p>
      </div>
      <div className="checkout-feature">
        <Link to="/checkout">
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <h1>Your Shopping Cart is Empty!</h1>
  )
}

const mapToStateProps = state => ({cart: state.cart, user: state.user})

export default connect(mapToStateProps)(Cart)
