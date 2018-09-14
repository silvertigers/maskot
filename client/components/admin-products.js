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
      isEdit: 0,
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

  add() {
    this.state.isAdd ?
    this.setState({
      isAdd: false,
    }) :
    this.setState({
      isAdd: true,
    })
  }

  edit(event) {
    const id = Number(event.target.value)

    this.state.isEdit === id ?
    this.setState({
      isEdit: 0,
    }) :
    this.setState({
      isEdit: Number(event.target.value)
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
                <h3>Product name: {product.name}</h3>
                <p>price: {product.price}</p>
                <p>quantity: {product.quantity ? product.quantity : <span>OUT OF STOCK</span>}</p>
                <button onClick={event => this.edit(event)} value={product.id}>EDIT</button>
                <button onClick={event => this.removeProduct(event)} value={product.id}>REMOVE</button>
                {
                  this.state.isEdit == product.id ?
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
