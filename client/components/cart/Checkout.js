import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import CheckoutForm from './CheckoutForm'
import axios from 'axios'
import {connect} from 'react-redux'
import {postGuestOrder, postUserOrder} from '../../store/order'
import {emptyCart} from '../../store/cart'

const orderTotal = cart => {
  return cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )
}

class Checkout extends React.Component {
  constructor() {
    super()
    this.onToken = this.onToken.bind(this)
  }

  saveOrder(email) {
    const status = 'placed'
    const {user, cart, postUserOrder, postGuestOrder} = this.props
    if (user.id) {
      postUserOrder({email, status, userId: user.id}, cart)
    } else {
      postGuestOrder({email, status}, cart)
    }
  }

  onToken(amount, description) {
    return async token => {
      try {
        const {data} = await axios.post('/api/charge', {
          description,
          amount,
          source: token.id,
          currency: 'usd'
        })
        console.log('Success', data)
        console.log(
          `User's email will be saved to order history: ${
            data.status.source.name
          }`
        )
        await this.saveOrder(data.status.source.name)
        this.props.emptyCart()
        this.props.history.push(`/confirmation`)
      } catch (err) {
        console.error('Payment failed!')
      }
    }
  }

  render() {
    const amount = orderTotal(this.props.cart)
    const description = 'Fashion-forward facewear'
    return (
      <div className="checkout">
        <CheckoutForm />
        <StripeCheckout
          email={this.props.user.email || null}
          name="Maskot Co."
          description={description}
          token={this.onToken(amount, description)}
          stripeKey="pk_test_psRrsym52IH8wxnCWh0h08Tj"
          amount={amount}
          currency="USD"
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({user: state.user, cart: state.cart})
const mapDispatchToProps = dispatch => ({
  postUserOrder: (order, cart) => dispatch(postUserOrder(order, cart)),
  postGuestOrder: (order, cart) => dispatch(postGuestOrder(order, cart)),
  emptyCart: () => dispatch(emptyCart())
})
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
