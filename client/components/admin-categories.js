import React, {Component} from 'react'
import {connect} from 'react-redux'
import { gotCategories } from '../store/categories'
import NewCategory from './newCategory'

class AdminCategories extends Component {
  constructor() {
    super()
    this.state = {
      isAdd: false,
    }
    this.add = this.add.bind(this)
  }

  async componentDidMount() {
    await this.props.gotCategories()
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

  render() {
    const { categories } = this.props.categories

    return (
      <div>
        <div className="admin_Categories_List">
        <h2>Categories List</h2>
        <span onClick={this.add}>ADD</span>
        {
          this.state.isAdd ?
          <NewCategory add={this.add} /> : <p>click add button if you want to add a new categories</p>
        }
        <ul>
        {
          categories[0] ?
          categories.map(category => {
            return (
              <li key={category.id}>
                <h3>{category.type}</h3>
              </li>
            )
          })
          : <h2>None of categories are exist</h2>
        }
        </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotCategories: () => dispatch(gotCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategories)
