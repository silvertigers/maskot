import React from 'react'
import {getOrder} from '../../store/order'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'

class SingleOrder extends React.Component {
  componentDidMount() {
    const {orderId} = this.props.match.params
    const {userId} = this.props.match.params
    this.props.getOrder(orderId, userId)
  }

  render() {
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
              {this.props.isAdmin ? (
                <Link to="/dashboard/orders">
                  <Button content="Back to Order" />
                </Link>
              ) : (
                <Link to={`/users/${this.props.match.params.userId}/orders`}>
                  <Button content="Back To Your Orders" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrder: (userId, orderId) => dispatch(getOrder(userId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
