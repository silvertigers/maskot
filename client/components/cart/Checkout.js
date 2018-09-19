import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {postGuestOrder, postUserOrder} from '../../store/order'

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

  async saveOrder(email) {
    const status = 'placed'
    const {user, cart, postUserOrder, postGuestOrder} = this.props
    if (user.id) {
      postUserOrder({email, status, userId: user.id}, cart)
    } else {
      postGuestOrder({email, status}, cart)
    }
    this.props.history.push(`/confirmation`)
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
        console.log(
          `User's email will be saved to order history: ${
            data.status.source.name
          }`
        )
        await this.saveOrder(data.status.source.name)
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

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
  order: state.order
})
const mapDispatchToProps = dispatch => ({
  postUserOrder: (order, cart) => dispatch(postUserOrder(order, cart)),
  postGuestOrder: (order, cart) => dispatch(postGuestOrder(order, cart))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
)
