import React from 'react'
import {connect} from 'react-redux'
import {editCart} from '../../store/cart'
import {Button, Icon} from 'semantic-ui-react'

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
        <Button.Group className="add-to-cart" id="button-group">
          <Button
            style={{width: '50px'}}
            className="minus"
            onClick={this.decrement}
          >
            -
          </Button>
          <Button.Or text={this.state.quantity} />
          <Button
            style={{width: '50px'}}
            className="plus"
            onClick={this.increment}
          >
            +
          </Button>
        </Button.Group>

        <Button
          className="cart-button"
          color="teal"
          type="button"
          onClick={this.addToCart}
          style={{
            width: '52px',
            marginLeft: '20px',
            position: 'absolute'
          }}
        >
          <Icon name="shopping cart" />
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart)
