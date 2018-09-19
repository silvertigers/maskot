import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store from '../store'
import {logout} from '../store/user'
import {setCartToStorage} from '../store/cart'
import {Label} from 'semantic-ui-react'

class Navbar extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  render() {
    const {handleClick, isLoggedIn, isAdmin, userId, cartItems} = this.props
    return (
      <div>
        <div className="ui teal inverted segment">
          <h1 className="nav-title">MASKOT</h1>
          <div className="ui inverted secondary menu">
            <Link to="/home" className="item">
              Home
            </Link>
            <Link to="/products" className="item">
              Products
            </Link>
            <Link to="/cart" className="item">
              Cart
              <Label>{cartItems}</Label>
            </Link>
            {isLoggedIn && (
              <Link to={`/users/${userId}/orders`} className="item">
                Orders
              </Link>
            )}
            {isAdmin && (
              <Link to="/dashboard" className="item">
                DashBoard
              </Link>
            )}
            {isLoggedIn ? (
              <a className="item" href="#" onClick={handleClick}>
                Logout
              </a>
            ) : (
              <Link to="/login" className="item">
                Login
              </Link>
            )}
            {!isLoggedIn && (
              <Link to="/signup" className="item">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    userId: state.user.id,
    cartItems: state.cart.reduce(
      (total, current) => total + current.quantity,
      0
    )
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      setCartToStorage(store.getState())
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
