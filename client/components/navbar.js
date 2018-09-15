import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <h1>MASKOT</h1>
    <nav>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        {isAdmin && <Link to="/dashboard">DashBoard</Link>}
        {isLoggedIn && (
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        )}
        <Link to="/login">Login</Link>
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
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
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
