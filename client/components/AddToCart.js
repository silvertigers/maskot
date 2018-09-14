import React from 'react'
import {connect} from 'react-redux'
import {editCart} from '../store/cart'

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCart: products => dispatch(editCart(products))
  }
}

class AddToCart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  addToCart() {
    const {product, cart, editCart} = this.props
    const newCart = [...cart]
    const {quantity} = this.state
    const prodIndex = cart.findIndex(item => {
      return item.product.id === product.id
    })
    if (prodIndex > -1) {
      newCart[prodIndex] = {
        product,
        quantity: newCart[prodIndex].quantity + quantity
      }
      editCart(newCart)
    } else {
      editCart([...cart, {product, quantity}])
    }
  }

  increment() {
    this.setState({quantity: this.state.quantity + 1})
  }
  decrement() {
    if (this.state.quantity > 1) {
      this.setState({quantity: this.state.quantity - 1})
    }
  }

  handleChange(event) {
    this.setState({quantity: event.target.value})
  }

  render() {
    return (
      <div className="add-to-cart">
        <button type="button" onClick={this.addToCart}>
          Add to cart
        </button>
        <input
          className="quantity"
          onChange={this.handleChange}
          value={this.state.quantity}
          type="number"
        />
        <button type="button" className="plus" onClick={this.increment}>
          +
        </button>
        <button type="button" className="minus" onClick={this.decrement}>
          -
        </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart)