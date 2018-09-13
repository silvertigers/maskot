import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editCart} from '../store/cart'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class LineItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange(event) {
    const prodIndex = this.props.cart.findIndex(item => {
      return item.product.id === this.props.product.id
    })
    const newCart = [...this.props.cart]
    newCart[prodIndex].quantity = Number(event.target.value)
    this.props.editCart(newCart)
  }

  handleDelete(event) {
    const prodIndex = this.props.cart.findIndex(item => {
      return item.product.id === this.props.product.id
    })
    const {cart} = this.props
    const newCart = cart.slice(0, prodIndex).concat(cart.slice(prodIndex + 1))
    this.props.editCart(newCart)
  }

  render() {
    const {id, name, imageUrl, price} = this.props.product
    const {quantity} = this.props
    return (
      <div className="line-item">
        <Link to={`/products/${id}`}>
          <div className="product-image">
            <img src={imageUrl} />
          </div>
        </Link>
        <div className="product-name">
          <h3>{name}</h3>
        </div>
        <div className="product-price">{price}</div>
        <button type="button" onClick={this.handleDelete}>
          X
        </button>
        <select
          className="product-quantity"
          value={quantity}
          onChange={this.handleChange}
        >
          {arr.map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <div className="product-total-price">
          {(price * quantity).toFixed(2)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({cart: state.cart})
const mapDispatchToProps = dispatch => ({
  editCart: products => dispatch(editCart(products))
})

export default connect(mapStateToProps, mapDispatchToProps)(LineItem)
