import React, {Component} from 'react'
import {connect} from 'react-redux'
import { productAdd } from '../store/products';
import { getCategories } from '../store/category';
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
      categories: [],
    }
    this.textChange = this.textChange.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.inputCategory = this.inputCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.gotCategories()
  }

  textChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  // We may don't need this section depend on Semantic UI
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
    var idx = arr.indexOf(Number(event.target.value))

    if (idx === -1) {
      arr.push(Number(event.target.value))
    } else {
      arr.splice(idx, 1)
    }
    arr.sort()
    this.setState({
      categories: arr,
    })
  }

  async handleSubmit(event) {
    event.preventDefault();

    await this.props.post(this.state);
    this.props.add(null, {name: 'List'})
  };

  render() {

    return (
      <div>
        <h2 className="title">Add a new Product</h2>

        <FormProduct textChange={this.textChange} increment={this.increment} decrement={this.decrement} handleSubmit={this.handleSubmit} inputCategory={this.inputCategory} value={this.state} category={this.props.categories}/>
      </div>
    )
  };
};

const mapStateToProps = state => {
  return {
    categories: state.category,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    post: product => dispatch(productAdd(product)),
    gotCategories: () => dispatch(getCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
