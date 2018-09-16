import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'
import OrderCard from './orderCard'


const mapStateToProps = (state) => {
  return {
    userOrders: state.orders.userOrders,
    userId: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserOrders: (userId) => dispatch(getOrders(userId))
  }
}

class UserOrders extends React.Component {
  componentDidMount(){
    this.props.getUserOrders(Number(this.props.match.params.userId));
  }

  render() {
    console.log(this.props)
    if (this.props.userId !== Number(this.props.match.params.userId)){
      return (
        <p>You are not authorized to view this user's order history.</p>
      )
    }
    return (
      <div>
        <ul>
          {this.props.userOrders.map(order => {
            return(
              <OrderCard order={order} user={this.props.userId} key={order.id} />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
