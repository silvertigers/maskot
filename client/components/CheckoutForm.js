import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {connect} from 'react-redux'

const orderTotal = cart =>
  cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      city: '',
      zipcode: '',
      complete: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const {token} = await this.props.stripe.createToken({
      name: `${this.state.name}`
    })

    console.log(`Received Stripe token: ${token}`)

    const response = await fetch('/api/guest/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) {
      console.log('Purchase complete!')
      this.setState({complete: true})
    }
    // this.props.stripe.createSource({type: 'card', name: this.state.name})
  }

  render() {
    // const {method, cart} = props
    return (
      <div className="checkout-form">
        <form onSubmit={this.handleSubmit}>
          <div className="address-section">
            <h2>Billing Information</h2>
            <label htmlFor="name">Name</label>
            <input name="name" type="text" value={this.state.name} />
            <label htmlFor="address">Address</label>
            <input name="address" type="text" value={this.state.address} />
            <label htmlFor="city">City</label>
            <input name="city" type="text" value={this.state.city} />
            <label htmlFor="zipcode">Zip code</label>
            <input name="zipcode" type="text" value={this.state.zipcode} />
          </div>
        </form>
        <div className="card-section">
          <h2>Payment</h2>
          <label>Card details</label>
          <CardElement />
        </div>
        <button type="submit">Place order</button>
      </div>
    )
  }
}

const mapGuest = state => ({
  method: 'guest',
  cart: state.cart
})

const mapUser = state => ({
  method: 'user',
  cart: state.cart
})

export default injectStripe(CheckoutForm)

// export const GuestCheckout = connect(mapGuest)(Checkout)
// export const UserCheckout = connect(mapUser)(Checkout)
