import React from 'react'
import {connect} from 'react-redux'
import {emptyCart} from '../../store/cart'
import OrderSummary from './OrderSummary'

class Confirmation extends React.Component {
  componentDidMount() {
    this.props.emptyCart()
  }
  render() {
    const {order} = this.props
    return (
      <div id="order-confirmation">
        <h2>Purchase Complete</h2>
        <h3>You're order is on it's way</h3>
        <p>Please allow for 3-5 business days</p>
        <OrderSummary order={order} />
      </div>
    )
  }
}

const mapStateToProps = state => ({order: state.order})

const mapDispatchToProps = dispatch => ({
  emptyCart: () => dispatch(emptyCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
