import React from 'react'
import {getProduct} from '../store/product'
import {connect} from 'react-redux'
import SingleReview from './SingleReview'
// import {editCart} from '../store/cart'

const mapStateToProps = state => {
  return {
    product: state.product,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getProduct(productId))
  }
}

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  handleAdd() {}

  render() {
    const {product} = this.props
    return (
      <div>
        <div className="product-image">
          <img src={product.imageUrl} />
        </div>
        <div className="product-details">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
        <div className="add-product">
          <button type="button">Add to cart</button>
          <button type="button" className="plus">
            +
          </button>
          <button type="button" className="minus">
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

export const ConnectedSingleProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct)
