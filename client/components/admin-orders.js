import React, {Component} from 'react'
import {connect} from 'react-redux'
import { gotOrder } from '../store/order'

class AdminOrders extends Component {
  constructor() {
    super()
    this.state = {
      filtered: '',
    }
    this.orderFilter = this.orderFilter.bind(this)
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

  render() {
    var { orders } = this.props.orders
    console.log(this.state.filtered)
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
                      <h2>{order.user ? order.user.email : order.email}</h2>
                      <h2>status: {order.status}</h2>
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
    gotOrder: () => dispatch(gotOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
