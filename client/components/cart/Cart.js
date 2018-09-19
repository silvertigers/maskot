import React from 'react'
import {connect} from 'react-redux'
import {Button, Transition} from 'semantic-ui-react'
import LineItem from './LineItem'
import Checkout from './Checkout'

const orderTotal = cart =>
  cart.reduce(
    (total, item) => total + item.product.price * item.quantity / 100,
    0
  )

const quantityTotal = cart =>
  cart.reduce((total, item) => total + item.quantity, 0)

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      animation: 'fade down',
      duration: 500,
      visible: false
    }
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handleVisibility = () => this.setState({visible: !this.state.visible})

  render() {
    const {animation, duration, visible} = this.state
    return this.props.cart[0] ? (
      <div id="cart" style={{padding: '40px'}}>
        <h1>Shopping Cart</h1>
        <h3>Items ({quantityTotal(this.props.cart)})</h3>
        <div style={{display: 'flex'}} className="flex-wrapper">
          <ul className="line-items">
            {this.props.cart.map(item => (
              <LineItem key={item.product.id} {...item} />
            ))}
          </ul>
          <div className="order-total">
            <h2>{`$ ${orderTotal(this.props.cart).toFixed(2)}`}</h2>
            <p>Total</p>
            <Button
              color="orange"
              className="checkout-btn"
              onClick={this.handleVisibility}
              style={{marginBottom: '30px'}}
            >
              Checkout
            </Button>
            <Transition.Group animation={animation} duration={duration}>
              {visible && <Checkout cart={this.props.cart} />}
            </Transition.Group>
          </div>
        </div>
      </div>
    ) : (
      <h1 style={{padding: '40px'}}>Your Shopping Cart is Empty!</h1>
    )
  }
}

const mapToStateProps = state => ({cart: state.cart, user: state.user})

export default connect(mapToStateProps)(Cart)
