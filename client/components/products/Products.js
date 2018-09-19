import React from 'react'
import {getProducts} from '../../store/products'
import {connect} from 'react-redux'
import ProductCard from './productCard'
import {getCategories, selectCategory} from '../../store/category'
import { Grid, Input, Select } from 'semantic-ui-react'
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

  handleCategoryChange(data) {
    this.props.selectCategory(Number(data.value))
    console.log(data)
  }

  render() {
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
    let categoryOptions = this.props.category.categories.map(category => { return (
        {
          key: category.id,
          name: category.type,
          value: category.id,
          text: category.type
        }
      )}
    )

    categoryOptions.unshift({
      key: 0,
      name: 'All',
      value: 0,
      text: 'All'
    })


    return (
    <div className="products-div">
      <div className="products-nav">
        <div>
        <Input className='search-input' icon='search' id="products-search" placeholder="Search products..." onChange={this.handleSearchChange} />
        </div>
        {/* <select className="category-select" onChange={this.handleCategoryChange}>
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
        </select> */}
        <div>
        <Select className='selector-category' placeholder='Categories' options={categoryOptions} onChange={(evt, data)=>{this.handleCategoryChange(data)}} />
        </div>
      </div>
      <div className="container-list">
        <Grid columns={3} divided>
            {this.state.searchTerm === '' ?
              filteredProducts.map(product => {
                return (
                <Grid.Column key={product.id} width={5}>
                  <ProductCard key={product.id} product={product} />
                </Grid.Column>
              )})
            : this.state.matches.map(product => {
              return (
                <Grid.Column key={product.id} width={5}>
                  <ProductCard product={product} />
                </Grid.Column>
              )})
            }
        </Grid>
      </div>
  </div>
)}}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
