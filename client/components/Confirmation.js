import React from 'react'
import {connect} from 'react-redux'
import OrderSummaryLineItem from './OrderSummaryLineItem'
import {emptyCart} from '../store/cart'

class Confirmation extends React.Component {
  componentDidMount() {
    this.props.emptyCart()
  }
  render() {
    const {cart} = this.props
    return (
      <div id="order-confirmation">
        <h2>Woohoo!</h2>
        <h3>You're order is on it's way</h3>
        <p>Please allow for 3-5 business days</p>
        <h3>Order Summary</h3>
        <table>
          <tbody id="order-summary">
            {cart &&
              cart.map(item => (
                <OrderSummaryLineItem key={item.product.id} item={item} />
              ))}
          </tbody>
        </table>
      </div>
    )
  }
}

// const mapStateToProps = state => ({cart: state.cart})
const mapDispatchToProps = dispatch => ({
  emptyCart: () => dispatch(emptyCart())
})
export default connect(null, mapDispatchToProps)(Confirmation)
