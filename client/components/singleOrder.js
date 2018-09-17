import React from 'react'
import {getOrder} from '../store/orders'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    userOrder: state.orders.userOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrder: (userId, orderId) => dispatch(getOrder(userId, orderId))
  }
}

class SingleOrder extends React.Component {

  componentDidMount() {
    this.props.getOrder(this.props.match.params.userId, this.props.match.params.orderId)
  }

  render() {
    console.log(this.props)
    if (this.props.userOrder.id) {return (
        <div>
          <div>
            <h3>Order # {this.props.userOrder.id}</h3>
            <p>placed on: {this.props.userOrder.createdAt}</p>
            <p>order status: {this.props.userOrder.status}</p>
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

          </div>
          <Link to={`/users/${this.props.match.params.userId}/orders`}><p>Back To Your Orders</p></Link>

      </div>
    )
  } else {
    return null
  }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
