import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AdminHome,
  Products,
  SingleProduct,
  Cart,
  UserOrders,
  SingleOrder,
  Checkout,
  Confirmation
} from './components'
import {me} from './store'
import {setCartToStorage, getCartFromStorage} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()

    window.onbeforeunload = () => {
      setCartToStorage(this.props)
    }

    window.onload = () => {
      this.props.getCartFromStorage(this.props)
    }
  }

  render() {
    const {isLoggedIn, isAdmin, cart} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={UserHome} />
        <Route exact path="/products" component={Products} />
        <Route
          path="/confirmation"
          render={() => <Confirmation cart={cart} />}
        />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/users/:userId/orders" component={UserOrders} />
            <Route
              path="/users/:userId/orders/:orderId"
              component={SingleOrder}
            />
            <Route path="/home" component={UserHome} />
            {isAdmin && <Route path="/dashboard" component={AdminHome} />}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    getCartFromStorage(props) {
      dispatch(getCartFromStorage(props))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
