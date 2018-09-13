import React from 'react'
import {getProducts} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    products: state.products.products,
    isFetching: state.products.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    if (this.props.isFetching === false) {
      return (
        <div className="products">
          <h1>Products</h1>
          <ul id="productsul">
            {this.props.products.map(product => {
              return (
                <li key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} />
                  </Link>
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
