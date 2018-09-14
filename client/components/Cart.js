import React from 'react'
import {connect} from 'react-redux'
import LineItem from './LineItem'

const orderTotal = cart =>
  cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
const quantityTotal = cart =>
  cart.reduce((total, item) => total + item.quantity, 0)

export const Cart = props => {
  return props.cart[0] ? (
    <div id="cart">
      <h1>Shopping Cart</h1>
      <h3>Items ({quantityTotal(props.cart)})</h3>
      <div className="line-items">
        {props.cart.map(item => <LineItem key={item.product.id} {...item} />)}
      </div>
      <div className="order-total">
        <h2>{orderTotal(props.cart).toFixed(2)}</h2>
        <p>Total</p>
      </div>
      <div className="checkout-feature">
        <button type="button" className="user-checkout">
          Checkout
        </button>
        <small>You will be prompted to log in</small>
        <div>OR</div>
        <button type="button" className="guest-checkout">
          Guest Checkout
        </button>
      </div>
    </div>
  ) : (
    <h1>Your Shopping Cart is Empty!</h1>
  )
}

const mapToStateProps = state => ({cart: state.cart})

export default connect(mapToStateProps)(Cart)
