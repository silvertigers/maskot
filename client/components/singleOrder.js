import React from 'react'
import {getOrder} from '../store/orders'
import { getOneOrder, editedOrder } from '../store/order'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    userOrder: state.orders.userOrder,
    order: state.order,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrder: (userId, orderId) => dispatch(getOrder(userId, orderId)),
    getOneOrder: orderId => dispatch(getOneOrder(orderId)),
    editOrder: order => dispatch(editedOrder(order))
  }
}

class SingleOrder extends React.Component {
  constructor() {
    super()
    this.orderStatus = this.orderStatus.bind(this)
    this.orderCancelled = this.orderCancelled.bind(this)
  }

  componentDidMount() {
    this.props.getOrder(this.props.match.params.userId, this.props.match.params.orderId)
    this.props.getOneOrder(this.props.match.params.orderId)
  }

  async orderStatus(event) {
    var statuslist = ["placed", "in process", "completed"]
    var current = statuslist.indexOf(event.target.value)
    if (current === 2 || event.target.value === "cancelled") {
      return
    }
    const orderStatus = {
      id: event.target.name,
      status: statuslist[current+1]
    }
    await this.props.editOrder(orderStatus)
  }

  async orderCancelled(event) {
    if (this.props.order.order.status === "completed") {
      return
    }

    const cancelOrder = {
      id: event.target.name,
      status: "cancelled"
    }
    await this.props.editOrder(cancelOrder)
  }

  render() {
    const isAdmin = this.props.isAdmin
    const { order } = this.props.order
    console.log(order)
    if (this.props.userOrder.id) {return (
        <div>
          <div>
            <h3>Order # {this.props.userOrder.id}</h3>
            <p>placed on: {this.props.userOrder.createdAt}</p>
            <p>order status: {order.status}</p>
          </div>
          <div>

              {this.props.userOrder.products.map(product => {
                return (
                  <ul key={product.id}>
                    <li>{product.name}</li>
                    <li>{product.description}</li>
                    <li>quantity: {product.quantity}</li>
                    <li>price: {product.price}</li>
                  </ul>
                )
              })}
            {
              isAdmin &&
              <div>
                <button name={this.props.userOrder.id} value={order.status} onClick={this.orderStatus}>next status</button>
                <button name={this.props.userOrder.id} onClick={this.orderCancelled} >cancelled</button>
              </div>
            }

          </div>
          {
            isAdmin ?
            <Link to={`/dashboard/orders`}>Back to Order List</Link> :
            <Link to={`/users/${this.props.match.params.userId}/orders`}><p>Back To Your Orders</p></Link>
          }

      </div>
    )
  } else {
    return null
  }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
