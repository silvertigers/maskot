import React from 'react'
import {connect} from 'react-redux'
import {emptyCart} from '../../store/cart'

class Confirmation extends React.Component {
  componentDidMount() {
    this.props.emptyCart()
  }
  render() {
    return (
      <div id="order-confirmation">
        <h2>Purchase Complete</h2>
        <h3>You're order is on its way</h3>
        <p>Please allow for 3-5 business days</p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  emptyCart: () => dispatch(emptyCart())
})

export default connect(null, mapDispatchToProps)(Confirmation)
