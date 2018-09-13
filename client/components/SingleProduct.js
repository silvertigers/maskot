import React from 'react'
import {getProduct} from '../store/product'
import {connect} from 'react-redux'
import SingleReview from './SingleReview'
import {editCart} from '../store/cart'

const mapStateToProps = state => {
  return {
    product: state.product,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getProduct(productId)),
    editCart: products => dispatch(editCart(products))
  }
}

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
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
    const {product} = this.props
    return (
      <div>
        <div className="product-image">
          <img src={`/${product.imageUrl}`} />
        </div>
        <div className="product-details">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
        <div className="add-product">
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
        {product.reviews &&
          product.reviews.map(review => (
            <SingleReview key={review.id} review={review} />
          ))}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
