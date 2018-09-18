import React, {Component} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import {Header, Container, Menu} from 'semantic-ui-react'
import AdminProducts from './admin-products'
import AdminCategories from './admin-categories'
import AdminOrders from './admin-orders'
import AdminUsers from './admin-users'
import AdminMain from './admin-main'

class AdminHome extends Component {
  state = {activeItem: 'Main'}

  handleItemClick = (e, {name}) => {
    this.props.history.push(`/dashboard/${name}`)
    this.setState({activeItem: name})
  }

  render() {
    const {activeItem} = this.state

    return (
      <div className="admin-home">
        <div className="dashboard_menu">
        <Menu vertical>
          <Menu.Item
            name=''
            active={activeItem === ''}
            onClick={this.handleItemClick}>
            Main
          </Menu.Item>
          <Menu.Item
            name='Product'
            active={activeItem === 'Product'}
            onClick={this.handleItemClick} />
          <Menu.Item
            name='Category'
            active={activeItem === 'Category'}
            onClick={this.handleItemClick} />
          <Menu.Item
            name='Orders'
            active={activeItem === 'Orders'}
            onClick={this.handleItemClick} />
          <Menu.Item
            name='Users'
            active={activeItem === 'Users'}
            onClick={this.handleItemClick} />
        </Menu>
        </div>
        <div className="components">
        <Switch>
          <Route exact path="/dashboard" component={AdminMain}/>
          <Route path="/dashboard/Product" component={AdminProducts}/>
          <Route path="/dashboard/Category" component={AdminCategories}/>
          <Route path="/dashboard/Orders" component={AdminOrders}/>
          <Route path="/dashboard/Users" component={AdminUsers}/>
        </Switch>
        </div>
      </div>
    )
  }
}

export default AdminHome
