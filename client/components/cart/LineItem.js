import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editCart} from '../../store/cart'

const createNumberList = number => {
  const list = []
  for (let i = 1; i <= number; i++) {
    list.push(i)
  }
  return list
}

class LineItem extends React.Component {
  constructor(props) {
    super(props)

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
      <li className="line-item">
        <Link to={`/products/${id}`}>
          <div className="product-image">
            <img src={imageUrl} />
          </div>
        </Link>
        <div className="product-name">
          <h3>{name}</h3>
        </div>
        <div className="product-price">{`$ ${price / 100}`}</div>
        <div>X</div>
        <select
          className="product-quantity"
          value={quantity}
          onChange={this.handleChange}
        >
          {createNumberList(15).map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <div className="product-total-price">
          {`$ ${price * quantity / 100}`}
        </div>
        <button type="button" onClick={this.handleDelete}>
          X
        </button>
      </li>
    )
  }
}

const mapStateToProps = state => ({cart: state.cart})
const mapDispatchToProps = dispatch => ({
  editCart: products => dispatch(editCart(products))
})

export default connect(mapStateToProps, mapDispatchToProps)(LineItem)
