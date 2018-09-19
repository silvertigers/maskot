import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store from '../store'
import {logout} from '../store/user'
import {setCartToStorage} from '../store/cart'
import {Label, Icon} from 'semantic-ui-react'

class Navbar extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  render() {
    const {handleClick, isLoggedIn, isAdmin, userId, cartItems} = this.props
    return (
      <div>
        <div className="ui teal inverted segment">
          <h1 style={{display: 'inline-block'}} className="nav-title">
            MASKOT
          </h1>
          <p style={{display: 'inline-block', marginLeft: '20px'}}>
            Fashion-forward facewear
          </p>
          <div className="ui inverted secondary menu">
            <div className="nav-items">
              <Link to="/home" className="item">
                Home
              </Link>
              <Link to="/products" className="item">
                Products
              </Link>
            </div>

            <div className="nav-items end">
              {isAdmin && (
                <Link to="/dashboard" className="item">
                  DashBoard
                </Link>
              )}
              {isLoggedIn && (
                <Link to={`/users/${userId}/orders`} className="item">
                  Orders
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
              <Link to="/cart" className="item">
                <Icon size="large" name="cart" />
                <Label circular floating size="small" color="orange">
                  {cartItems}
                </Label>
              </Link>
            </div>
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
