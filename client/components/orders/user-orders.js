import React from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../../store/orders'
import OrderCard from './orderCard'

const mapStateToProps = state => {
  return {
    orders: state.orders,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserOrders: userId => dispatch(getOrders(userId))
  }
}

class UserOrders extends React.Component {
  componentDidMount() {
    this.props.getUserOrders(Number(this.props.match.params.userId))
  }

  render() {
    if (this.props.userId !== Number(this.props.match.params.userId)) {
      return <p>You are not authorized to view this user's order history.</p>
    }
    return (
      <div className="user-orders">
      <h3> Your Orders </h3>
        {this.props.orders[0] ? (
          <ul>
            {this.props.orders.map(order => {
              return (
                <OrderCard
                  order={order}
                  userId={this.props.userId}
                  key={order.id}
                />
              )
            })}
          </ul>
        ) : (
          <h2>You have no orders</h2>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
