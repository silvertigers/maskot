import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { gotOrder, editedOrder } from '../store/order'

class AdminOrders extends Component {
  constructor() {
    super()
    this.state = {
      filtered: '',
    }
    this.orderFilter = this.orderFilter.bind(this)
    this.changeOrderStatus = this.changeOrderStatus.bind(this)
    this.orderStatus = this.orderStatus.bind(this)
    this.orderCancelled = this.orderCancelled.bind(this)
  }

  async componentDidMount() {
    this.props.gotOrder();
  }

  orderFilter(event) {
    const word = event.target.value
    var filterWord = ""
    if (word === "placed") {
      filterWord = "placed"
    } else if (word === "in process") {
      filterWord = "in process"
    } else if (word === "completed") {
      filterWord = "completed"
    } else if (word === "cancelled") {
      filterWord = "cancelled"
    }
    this.setState({
      filtered: filterWord,
    })
  }

  async changeOrderStatus(event) {
    const updatedData = {
      id: event.target.name,
      status: event.target.value
    }
    await this.props.editOrder(updatedData)
  }

  async orderStatus(event) {
    var statuslist = ["placed", "in process", "completed"]
    var current = statuslist.indexOf(event.target.value)
    if (current === 2) {
      return
    }
    const orderStatus = {
      id: event.target.name,
      status: statuslist[current+1]
    }
    await this.props.editOrder(orderStatus)
  }

  async orderCancelled(event) {
    const cancelOrder = {
      id: event.target.name,
      status: "cancelled"
    }
    await this.props.editOrder(cancelOrder)
  }

  render() {
    var { orders } = this.props.orders

    return (
      <div>
        <div className="admin_Order_List">
          <h2>Order list</h2>
          <div className="order_list">
            <button value="all" onClick={this.orderFilter}>All Orders</button>
            <button value="placed" onClick={this.orderFilter}>In placed</button>
            <button value="in process" onClick={this.orderFilter}>In process</button>
            <button value="completed" onClick={this.orderFilter}>Completed</button>
            <button value="cancelled" onClick={this.orderFilter}>Cancelled</button>
          </div>
          <ul>
            {
              orders[0] ?
              orders.map(order => {
                if (order.status === this.state.filtered || !this.state.filtered) {
                  return (
                    <li key={order.id}>
                      <Link to={`/users/${order.user.id}/orders/${order.id}`}>
                      <h2>{order.user ? order.user.email : order.email}</h2>
                      </Link>
                      <h2>status: {order.status}</h2>
                      <select name={order.id} onChange={this.changeOrderStatus} value={order.status}>
                        <option value="placed">Placed</option>
                        <option value="in process">in process</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {
                        !(order.status === "completed" || order.status === "cancelled") &&
                        <div>
                          <button name={order.id} value={order.status} onClick={this.orderStatus}>next status</button>
                          <button name={order.id} onClick={this.orderCancelled}>cancelled</button>
                        </div>
                      }
                    </li>
                  )
                }
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
    gotOrder: () => dispatch(gotOrder()),
    editOrder: order => dispatch(editedOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
