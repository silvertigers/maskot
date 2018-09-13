import React, {Component} from 'react'
import {connect} from 'react-redux'
import { productEdit } from '../store/products';
import { getProduct } from '../store/product';
import { FormProduct } from './formProduct';

class EditProduct extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      name: '',
      imageUrl: '',
      description: '',
      quantity: 0,
      price: 0,
    }
    this.textChange = this.textChange.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.getProduct(this.props.id)
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
    this.props.edit();
  };

  render() {
    return (
      <div>
        <h2 className="title">Edit Product</h2>

        <FormProduct textChange={this.textChange} increment={this.increment} decrement={this.decrement} handleSubmit={this.handleSubmit} value={this.state}/>
      </div>
    )
  };
};

const mapStateToProps = state => ({
  product: state.product,
})

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getProduct(productId)),
    put: product => dispatch(productEdit(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
