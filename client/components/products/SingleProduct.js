import React from 'react'
import {Card} from 'semantic-ui-react'
import {getProduct} from '../../store/product'
import {connect} from 'react-redux'
import {SingleReview, AddToCart, ReviewForm} from '../index'

const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.user
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
        <div className="single-product">
          <div className="product product-image">
            <img src={`${imageUrl}`} />
          </div>
          <div className="product product-details">
            <Card>
              <Card.Content header={name} />
              <Card.Content>{`$ ${price / 100}`}</Card.Content>
              <Card.Content description={description} />
              <Card.Content extra>
                <AddToCart product={this.props.product} />
              </Card.Content>
            </Card>
          </div>
        </div>
        {reviews && reviews[0] ? (
          <div className="reviews">
            <h2>Reviews</h2>
            <ReviewForm productId={this.props.match.params.productId} />
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
