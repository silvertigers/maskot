import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store from '../store'
import {logout} from '../store/user'
import {setCartToStorage} from '../store/cart'

const Navbar = ({handleClick, isLoggedIn, isAdmin, userId}) => (
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
        </Link>
        <Link to={`/users/${userId}/orders`} className="item">
          Past Orders
        </Link>
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
        <Link to="/signup" className="item">
          Sign Up
        </Link>
      </div>
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    userId: state.user.id
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
