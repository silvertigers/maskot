import React, {Component} from 'react'
import {connect} from 'react-redux'
import { productEdit } from '../store/products';
import { getProduct } from '../store/product';
import { getCategories } from '../store/category';
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
      categories: [],
    }
    this.textChange = this.textChange.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.inputCategory = this.inputCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.getProduct(this.props.id)
    this.setState(this.props.product)

    // this.props.categories.forEach(category => {
    //   return selected.push(category.id)
    // })

    // this.setState({
    //   categories: selected
    // })
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

  inputCategory(event) {
    var arr = this.state.categories
    arr.push(event.target.value)
    arr.sort()
    this.setState({
      categories: arr,
    })
  }

  async handleSubmit(event) {
    event.preventDefault();

    await this.props.put(this.state);
    this.props.edit();
  };

  render() {
    // console.log('state cate', this.state.categories)
    return (
      <div>
        <h2 className="title">Edit Product</h2>

        <FormProduct textChange={this.textChange} increment={this.increment} decrement={this.decrement} handleSubmit={this.handleSubmit} inputCategory={this.inputCategory} value={this.state} category={this.props.categories}/>
      </div>
    )
  };
};

const mapStateToProps = state => ({
  product: state.product,
  categories: state.category,
})

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getProduct(productId)),
    put: product => dispatch(productEdit(product)),
    gotCategories: () => dispatch(getCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
