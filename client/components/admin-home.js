import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter, Route, Switch, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import AdminProducts from "./admin-products"
import AdminUsers from "./admin-users"

class AdminHome extends Component {

  render() {

    return (
      <div>
        <h1>This is a Dashboard page for Admin</h1>
        <div className="dashboard_menu">
          <Link to="/dashboard/products">Products</Link>
          <Link to="/dashboard/users"> User</Link>
        </div>
        <Switch>
          <Route path="/dashboard/products" component={AdminProducts}/>
          <Route path="/dashboard/users" component={AdminUsers}/>
        </Switch>
      </div>
    )
  }

}

export default AdminHome
