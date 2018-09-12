import React from 'react'
import {getProduct} from '../reducer'
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    products: state.products.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: () => dispatch(getProduct())
  }
}

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProducts()
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
        {product.reviews.map(review => <Review review={review} />)}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
