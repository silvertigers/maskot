import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";
import { getProduct, productEdit } from '../store/products';
import { FormProduct } from './formProduct';

class EditProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      quantity: 0,
      price: 0,
    }
    this.textChange = this.textChange.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    this.props.getProduct()
    this.setState(this.props.product)
  }

  textChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  increment() {
    this.setState({
        quantity: this.state.quantity + 1
    })
  };

  decrement() {
    this.setState({
      quantity: this.state.quantity - 1
    })
  };

  async handleSubmit(event) {
    event.preventDefault();

    await this.props.put(this.state);
  };

  render() {

    return (
      <div>
        <h2 className="title">Edit Product</h2>

        <FormProduct textChange={this.textChange} increment={this.increment} decrement={this.decrement} handleSubmit={this.handleSubmit} value={this.satte}/>
      </div>
    )
  };
};

const mapStateToProps = state => ({
  product: state.products.product
})

const mapDispatchToProps = dispatch => {
  return {
    getProduct: () => dispatch(getProduct()),
    put: product => dispatch(productEdit(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProduct));
