import React from 'react'
import {getOrder, editedOrder} from '../../store/order'
import {connect} from 'react-redux'
import {Link, Button} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    order: state.order,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrder: (userId, orderId) => dispatch(getOrder(userId, orderId)),
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
    const {orderId} = this.props.match.params
    const {userId} = this.props.match.params
    this.props.isAdmin
      ? this.props.getOrder(orderId)
      : this.props.getOrder(orderId, userId)
  }

  async orderStatus(event) {
    var statuslist = ['placed', 'in process', 'completed']
    var current = statuslist.indexOf(event.target.value)
    if (current === 2 || event.target.value === 'cancelled') {
      return
    }
    const orderStatus = {
      id: event.target.name,
      status: statuslist[current + 1]
    }
    await this.props.editOrder(orderStatus)
  }

  async orderCancelled(event) {
    if (this.props.order.status === 'completed') {
      return
    }

    const cancelOrder = {
      id: event.target.name,
      status: 'cancelled'
    }
    await this.props.editOrder(cancelOrder)
  }

  render() {
    const {isAdmin} = this.props
    const {order} = this.props
    if (order.id) {
      return (
        <div>
          <div>
            <h3>Order # {order.id}</h3>
            <p>Placed on: {order.createdAt}</p>
            <p>Order status: {order.status}</p>
          </div>
          <div>
            {order.products &&
              order.products.map(product => {
                return (
                  <ul key={product.id}>
                    <img src={product.imageUrl} />
                    <li>{product.name}</li>
                    <li>{product.description}</li>
                    <li>quantity: {product.quantity}</li>
                    <li>price: {product.price}</li>
                  </ul>
                )
              })}
            <div>
              {isAdmin && (
                <div>
                  <Button
                    content="cancel"
                    color="red"
                    name={this.props.userOrder.id}
                    onClick={this.orderCancelled}
                    icon="cancel"
                    labelPosition="left"
                  />
                  <Button
                    content="next status"
                    color="olive"
                    name={this.props.userOrder.id}
                    value={order.status}
                    onClick={this.orderStatus}
                    icon="right arrow"
                    labelPosition="right"
                  />
                </div>
              )}
            </div>
            {isAdmin ? (
              <Link to={`/dashboard/orders`}>
                <Button content="Back to Order" />
              </Link>
            ) : (
              <Link to={`/users/${this.props.match.params.userId}/orders`}>
                <Button content="Back To Your Orders" />
              </Link>
            )}
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
