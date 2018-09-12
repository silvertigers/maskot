import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getProducts, productRemove  } from '../store/products'
import { Link } from 'react-router-dom'

export class AdminProducts extends Component {
  componentDidMount() {
    this.props.getProduct();
  }

  async removeProduct(event) {
    const productId = event.target.value;
    await this.props.removedCampus(productId)
  }

  editProduct(event) {
    const productId = event.target.value;
    this.props.history.push(`/products/${productId}/edit`)
  }

  render() {
    const { products } = this.props

    return (
      <div>
        <div className="admin_Product_List">
        <h2>dummy list</h2>
        <Link to={'/product/add'}>
        <span>ADD</span>
        </Link>
        <ul>
        {
          products.map(product => {
            return (
              <li key={product.id}>
                <h3>{product.title}</h3>
                <p>{product.price}</p>
                <button onClick={event => this.editProduct(event)} value={product.id}>EDIT</button>
                <button onClick={event => this.removeProduct(event)} value={product.id}>REMOVE</button>
              </li>
            )
          })
        }
        </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    productId: state.products.productId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: () => dispatch(getProducts()),
    removedProduct: productId => dispatch(productRemove(productId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)
