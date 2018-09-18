import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editedOrder} from '../../store/order'
import {getOrders} from '../../store/orders'
import AdminOrderCard from './admin-order-card'

class AdminOrders extends Component {
  constructor() {
    super()
    this.state = {
      filtered: ''
    }
    this.orderFilter = this.orderFilter.bind(this)
    this.changeOrderStatus = this.changeOrderStatus.bind(this)
    this.orderStatus = this.orderStatus.bind(this)
    this.orderCancelled = this.orderCancelled.bind(this)
  }

  componentDidMount() {
    this.props.getOrders()
  }

  orderFilter(event) {
    const word = event.target.value
    var filterWord = ''
    if (word === 'placed') {
      filterWord = 'placed'
    } else if (word === 'processing') {
      filterWord = 'processing'
    } else if (word === 'completed') {
      filterWord = 'completed'
    } else if (word === 'cancelled') {
      filterWord = 'cancelled'
    }
    this.setState({
      filtered: filterWord
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
    var statuslist = ['placed', 'processing', 'completed']
    var current = statuslist.indexOf(event.target.value)
    if (current === 2) {
      return
    }
    const orderStatus = {
      id: event.target.name,
      status: statuslist[current + 1]
    }
    await this.props.editOrder(orderStatus)
  }

  async orderCancelled(event) {
    const cancelOrder = {
      id: event.target.name,
      status: 'cancelled'
    }
    await this.props.editOrder(cancelOrder)
  }

  render() {
    var {orders} = this.props

    return (
      <div>
        <div className="admin_Order_List">
          <h2>Order list</h2>
          <div className="order_list">
            <button type="button" value="all" onClick={this.orderFilter}>
              All Orders
            </button>
            <button type="button" value="placed" onClick={this.orderFilter}>
              Placed
            </button>
            <button type="button" value="processing" onClick={this.orderFilter}>
              Processing
            </button>
            <button type="button" value="completed" onClick={this.orderFilter}>
              Completed
            </button>
            <button type="button" value="cancelled" onClick={this.orderFilter}>
              Cancelled
            </button>
          </div>
          <ul>
            {orders[0] ? (
              orders.map(order => {
                if (
                  order.status === this.state.filtered ||
                  !this.state.filtered
                ) {
                  return (
                    <AdminOrderCard
                      key={order.id}
                      order={order}
                      changeOrderStatus={this.changeOrderStatus}
                      orderStatus={this.orderStatus}
                      orderCancelled={this.orderCancelled}
                    />
                  )
                }
              })
            ) : (
              <h2>No products are available at this time</h2>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders()),
    editOrder: order => dispatch(editedOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
