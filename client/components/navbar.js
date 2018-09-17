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
        <a className="item">
          <Link to="/home">Home</Link>
        </a>
        <a className="item">
          <Link to="/products">Products</Link>
        </a>
        <a className="item" href="/cart">
          <Link to="/cart">Cart</Link>
        </a>
        <a className="item" href={`/users/${userId}/orders`}>
          <Link to={`/users/${userId}/orders`}>Past Orders</Link>
        </a>
        {isAdmin && <a className="item">
          <Link to="/dashboard">DashBoard</Link>
        </a>}
        {isLoggedIn ? (
          <a className="item" href="#" onClick={handleClick}>
            Logout
          </a>
        ) : (
          <a className="item"><Link to="/login">Login</Link></a>
        )}
        <a className="item" href="/signup"><Link to="/signup">Sign Up</Link></a>
      </div>
    </div>
    {/* <nav>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to={`/users/${userId}/orders`}>Past Orders</Link>
        {isAdmin && <Link to="/dashboard">DashBoard</Link>}
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
    <hr /> */}
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
