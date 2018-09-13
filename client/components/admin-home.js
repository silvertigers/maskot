import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter, Route, Switch, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import AdminProducts from "./admin-products"

class AdminHome extends Component {

  render() {

    return (
      <div>
        <h1>This is a Dashboard page for Admin</h1>
        <div className="dashboard_menu">
        <Link to="/dashboard/products">Products</Link>
        </div>
        <Switch>
          <Route path="/dashboard/products" component={AdminProducts}/>
        </Switch>
      </div>
    )
  }

}

export default AdminHome
