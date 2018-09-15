import React, {Component} from 'react'
import {connect} from 'react-redux'
import { gotOrder } from '../store/order'

class AdminOrders extends Component {
  async componentDidMount() {
    this.props.gotOrder();
  }

  render() {
    const { orders } = this.props.orders

    return (
      <div>
        <div className="admin_Order_List">
          <h2>Order list</h2>
          <ul>
            {
              orders[0] ?
              orders.map(order => {
                return (
                  <li key={order.id}>
                    <h2>{order.user ? order.user.email : order.email}</h2>
                    <h2>status: {order.status}</h2>
                  </li>
                )
              }) :
              <h2>None of products are available at this time</h2>
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotOrder: () => dispatch(gotOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
