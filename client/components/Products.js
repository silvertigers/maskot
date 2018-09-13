import React from 'react'
import { getProducts } from '../store/products'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCard from './productCard'
import { getCategories, selectCategory } from '../store/category'

const mapStateToProps = state => {
  return {
    products: state.products.allProducts,
    category: state.category,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategories()),
    selectCategory: (category) => dispatch(selectCategory(category)),
  }
}

class Products extends React.Component {
  constructor(){
    super()
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

  componentDidMount(){
    this.props.getProducts();
    this.props.getCategories()
  }

  handleCategoryChange(event){
    this.props.selectCategory(Number(event.target.value));
  }


  render() {
    let filteredProducts = this.props.products.filter(product => {return(product.categories[0].id === this.props.category.selectedCategory)})
    return (
      <div className="products">
        <h1>Products</h1>
        <select onChange={this.handleCategoryChange}>
          {this.props.category.categories.map(category => {
            return (
              <option key={category.id} name={category.type} value={category.id}>{category.type}</option>
            )
          })}
        </select>
        <ul id="productsul">
          {filteredProducts[0] && filteredProducts.map(product => {
            return (
              <ProductCard key={product.id} product={product} />
            )
          })}
        </ul>
      </div>
    )}
  }


export default connect(mapStateToProps, mapDispatchToProps)(Products)
