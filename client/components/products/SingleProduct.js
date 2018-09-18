import React from 'react'
import {getProduct} from '../../store/product'
import {connect} from 'react-redux'
import {SingleReview, AddToCart} from '../index'

const mapStateToProps = state => {
  return {
    product: state.product
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
  render() {
    const {imageUrl, name, description, reviews, price} = this.props.product
    return (
      <div>
        <div className="product-image">
          <img src={`${imageUrl}`} />
        </div>
        <div className="product-details">
          <h2>{name}</h2>
          <p>{`$ ${price / 100}`}</p>
          <p>{description}</p>
        </div>
        <AddToCart product={this.props.product} />
        {reviews && reviews[0] ? (
          <div className="reviews">
            <h2>Reviews</h2>
            {reviews.map(review => (
              <SingleReview key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <h2>There are no reviews for this product</h2>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
