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
        <div id="product-image">
          <img src={product.imageUrl} />
        </div>
        <div id="product-details">
          <h2>{product.name}</h2>
          <p>{product.description}></p>
        </div>
        {product.reviews.map(review => (
          <SingleReview key={review.id} review={review} />
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
