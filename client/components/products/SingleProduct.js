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
      <div style={{padding: '40px'}}>
        <div
          className="single-product"
          style={{display: 'flex', justifyContent: 'space-evenly'}}
        >
          <img
            src={`${imageUrl}`}
            style={{maxHeight: '400px', objectFit: 'contain'}}
          />
          <div
            style={{display: 'flex', flexFlow: 'column', alignItems: 'center'}}
          >
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

            {reviews && reviews[0] ? (
              <div className="reviews">
                <h2
                  style={{
                    textAlign: 'left',
                    marginTop: '30px'
                  }}
                >
                  Reviews
                </h2>
                <ReviewForm productId={this.props.match.params.productId} />
                {reviews.map(review => (
                  <SingleReview key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p style={{marginTop: '60px'}}>
                There are no reviews for this product
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
