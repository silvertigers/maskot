import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {AdminProducts} from "./admin-products"

export class AdminHome extends Component {

  render() {
    return (
      <div>
        <h1>This is a Dashboard page for Admin</h1>
      <div className="dashboard_menu">
        <h2>Products</h2>
      </div>
      <Switch>
        <Route path="/dashboard/products" component={AdminProducts}/>
      </Switch>
      </div>
    )
  }

}

export default connect()(AdminHome)

