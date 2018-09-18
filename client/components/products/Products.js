import React from 'react'
import {getProducts} from '../../store/products'
import {connect} from 'react-redux'
import ProductCard from './productCard'
import {getCategories, selectCategory} from '../../store/category'

const mapStateToProps = state => {
  return {
    products: state.products.products,
    category: state.category
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategories()),
    selectCategory: category => dispatch(selectCategory(category))
  }
}

class Products extends React.Component {
  constructor() {
    super()
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.getCategories()
  }

  handleCategoryChange(event) {
    this.props.selectCategory(Number(event.target.value))
  }

  render() {
    let filteredProducts = []
    if (this.props.category.selectedCategory === 0){
      filteredProducts = this.props.products
    } else {
    for (let i = 0; i < this.props.products.length; i++) {
      for (let j = 0; j < this.props.products[i].categories.length; j++) {
        if (
          this.props.products[i].categories[j].id ===
          this.props.category.selectedCategory
        ) {
          filteredProducts.push(this.props.products[i])
        }
      }
    }}
    return (
      <div className="products">
        <h1>Products</h1>
        <select onChange={this.handleCategoryChange}>
          <option value="0">All</option>
          {this.props.category.categories.map(category => {
            return (
              <option
                key={category.id}
                name={category.type}
                value={category.id}
              >
                {category.type}
              </option>
            )
          })}
        </select>
        <ul id="productsul">
          {filteredProducts[0] &&
            filteredProducts.map(product => {
              return <ProductCard key={product.id} product={product} />
            })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
