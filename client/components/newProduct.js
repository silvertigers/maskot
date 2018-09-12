import React, {Component} from 'react'
import {connect} from 'react-redux'
import { productAdd } from '../store/products';
import { FormProduct } from './formProduct';

class NewProduct extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

    await this.props.post(this.state);
    this.props.add()
  };

  render() {
    console.log(this.state)
    return (
      <div>
        <h2 className="title">Add a new Product</h2>

        <FormProduct textChange={this.textChange} increment={this.increment} decrement={this.decrement} handleSubmit={this.handleSubmit} value={this.state}/>
      </div>
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    post: product => dispatch(productAdd(product)),
  };
};

export default connect(null, mapDispatchToProps)(NewProduct);
