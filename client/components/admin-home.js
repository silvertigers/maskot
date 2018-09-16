import React, {Component} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import AdminProducts from "./admin-products"
import AdminCategories from "./admin-categories"
import AdminOrders from "./admin-orders"
import AdminUsers from "./admin-users"

class AdminHome extends Component {

  render() {

    return (
      <div>
        <h1>This is a Dashboard page for Admin</h1>
        <div className="dashboard_menu">

          <Link to="/dashboard/products">Product</Link>
          <Link to="/dashboard/categories"> Category</Link>
          <Link to="/dashboard/orders"> Order</Link>

          <Link to="/dashboard/users"> User</Link>
        </div>
        <Switch>
          <Route path="/dashboard/products" component={AdminProducts}/>
          <Route path="/dashboard/categories" component={AdminCategories}/>
          <Route path="/dashboard/orders" component={AdminOrders}/>
          <Route path="/dashboard/users" component={AdminUsers}/>
        </Switch>
      </div>
    )
  }

}

export default AdminHome
