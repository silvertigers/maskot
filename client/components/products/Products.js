import React from 'react'
import {getProducts} from '../../store/products'
import {connect} from 'react-redux'
import ProductCard from './productCard'
import {getCategories, selectCategory} from '../../store/category'
// import { Search, Grid, Header, Segment, List } from 'semantic-ui-react'
// import _ from 'lodash'
// =======
// import {Grid, List} from 'semantic-ui-react'

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
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.state = {
      searchTerm: '',
      matches: []
    }
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.getCategories()
  }

  handleSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
    let caseInsensitiveSearch = new RegExp(this.state.searchTerm, "i")
    let matchArr2 = []
    for (let i = 0; i < this.props.products.length; i++){
      if (this.props.products[i].name.toLowerCase().startsWith(this.state.searchTerm.toLowerCase())){
        matchArr2.push(this.props.products[i])
      }
    }
    this.setState({
      matches: matchArr2
    })
  }

  handleCategoryChange(event) {
    this.props.selectCategory(Number(event.target.value))
  }

  render() {
    console.log(this.props.products)
    console.log(this.state)
    if (this.props.products[0]) {console.log(this.props.products[0].name)}
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
      <div className="products-grid">
        <h1>Products</h1>
          <input type="search" id="products-search" placeholder="Search products..." onChange={this.handleSearchChange} />
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
        <div id="productsul">
          {this.state.searchTerm === '' ?
            filteredProducts.map(product => {
              return <ProductCard key={product.id} product={product} />
            })
          : this.state.matches.map(product => {
            return <ProductCard key={product.id} product={product} />
          })
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
