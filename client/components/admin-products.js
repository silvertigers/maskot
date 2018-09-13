import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getProducts, productRemove } from '../store/products'
import NewProduct from "./newProduct"
import EditProduct from "./editProduct"

class AdminProducts extends Component {
  constructor() {
    super()
    this.state = {
      isAdd: false,
      isEdit: false,
    }
    this.add = this.add.bind(this)
    this.edit = this.edit.bind(this)
  }

  async componentDidMount() {
    this.props.getProducts();
  }

  async removeProduct(event) {
    const productId = event.target.value;
    await this.props.productRemove(productId)
  }

  editProduct(event) {
    const productId = event.target.value;
    this.props.history.push(`/products/${productId}/edit`)
  }

  add() {
    this.state.isAdd ?
    this.setState({
      isAdd: false,
    }) :
    this.setState({
      isAdd: true,
    })
  }

  edit() {
    this.state.isEdit ?
    this.setState({
      isEdit: false,
    }) :
    this.setState({
      isEdit: true,
    })
  }

  render() {
    const { products } = this.props.products

    return (
      <div>
        <div className="admin_Product_List">
        <h2>dummy list</h2>
        <span onClick={this.add}>ADD</span>
        {
          this.state.isAdd ?
          <NewProduct add={this.add}/> : <h2>click add button if you want to add a new product</h2>
        }
        <ul>
        {
          products[0] ?
          products.map(product => {
            return (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <button onClick={this.edit}>EDIT</button>
                <button onClick={event => this.removeProduct(event)} value={product.id}>REMOVE</button>
                {
                  this.state.isEdit ?
                  <EditProduct edit={this.edit} id={product.id} /> : <div/>
                }
              </li>
            )
          })
          : <h2>None of products are available at this time</h2>
        }
        </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts()),
    productRemove: productId => dispatch(productRemove(productId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)
