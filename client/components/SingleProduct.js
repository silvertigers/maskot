import React from 'react'
import {getProduct} from '../reducer'
import {connect} from 'react-redux'
import SingleReview from './SingleReview'

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: () => dispatch(getProduct())
  }
}

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct()
  }

  render() {
    const product = this.props
    return (
      <div>
        <div className="product-image">
          <img src={product.imageUrl} />
        </div>
        <div className="product-details">
          <h2>{product.name}</h2>
          <p>{product.description}></p>
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
        {product.reviews.map(review => (
          <SingleReview key={review.id} review={review} />
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
