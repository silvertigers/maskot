import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { getCategories } from '../store/category'
import NewCategory from './newCategory'

class AdminCategories extends Component {
  constructor() {
    super()
    this.state = {
      isAdd: false,
      activeItem: 'List'
    }
  }

  async componentDidMount() {
    await this.props.gotCategories()
  }

  render() {
    const { categories } = this.props.categories
    const { activeItem } = this.state

    return (
      <div>
        <div className="admin_Categories_List">
        <Menu tabular>
          <Menu.Item name='List' active={activeItem === 'List'}/>
        </Menu>
          <div>
          <h2>Categories List</h2>
          <div className="category">
          {
            categories[0] ?
            categories.map(category => {
              return (
                <div id="category" key={category.id}>
                  <h3>#{category.type}</h3>
                </div>
              )
            })
            : <h2>None of categories are exist</h2>
          }
          </div>
          </div>
        </div>
        <NewCategory />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotCategories: () => dispatch(getCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategories)
