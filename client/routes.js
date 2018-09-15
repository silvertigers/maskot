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
  Cart
} from './components'
import {me} from './store'
import {editCart} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()

    window.onbeforeunload = event => {
      const {user, cart} = this.props
      if (cart[0]) {
        if (user && user.id) {
          const userCarts = window.localStorage.getItem('userCarts')
          const prevCart = userCarts.find(cart => cart.userId === user.id)
          if (prevCart) {
            prevCart.cart = cart
            window.localStorage.setItem('carts', userCarts)
          } else {
            window.localStorage.setItem('carts', [
              ...userCarts,
              {userId: user.id, cart}
            ])
          }
        } else {
          window.localStorage.setItem('guestCart', cart)
        }
      }
    }

    window.onload = event => {
      const {user, editCart} = this.props
      if (user && user.id) {
        const userCarts = window.localStorage.getItem('userCarts')
        const prevCart = userCarts.find(cart => cart.userId === user.id)
        if (prevCart) {
          editCart(prevCart)
        }
      }
    }
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Switch>
          <Route path="/home" component={UserHome} />
          {isLoggedIn &&
            (isAdmin && <Route path="/dashboard" component={AdminHome} />)}
          <Route path="/cart" component={Cart} />
          <Route path="/products/:productId" component={SingleProduct} />
        </Switch>
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
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    editCart(cart) {
      dispatch(editCart(cart))
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
