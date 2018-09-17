import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store from '../store'
import {logout} from '../store/user'
import {setCartToStorage} from '../store/cart'

const Navbar = ({handleClick, isLoggedIn, isAdmin, userId}) => (
  <div>
    <h1>MASKOT</h1>
    <nav>
      <div>
        <Link to="/home">Home</Link>
        {isAdmin && <Link to="/dashboard">DashBoard</Link>}
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        {isLoggedIn && <Link to={`/users/${userId}/orders`}>Past Orders</Link>}
        {isLoggedIn ? (
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
    <hr />
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
