import React from 'react'
import {getOrder, editedOrder} from '../../store/order'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Button, Container, Divider, Card, Image } from 'semantic-ui-react'

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
  componentDidMount() {
    const {orderId} = this.props.match.params
    const {userId} = this.props.match.params
    this.props.getOrder(orderId, userId)
  }

  render() {
    const {order, isAdmin} = this.props
    if (order.id) {
      const orderDate = order.createdAt.slice(0, 9)
      return (
        <div className="single-order">
          <Container>
            <div>
              <h3>Order # {order.id}</h3>
              <p>Placed on: {orderDate}</p>
              <p>Order status: {order.status}</p>
            </div>
            <Divider />
            <h5>Your Products: </h5>
              <div>
                {order.products && order.products.map(product => {
                  return (
                    <Card key={product.id}>
                      <Image src={`../../../${product.imageUrl}`} />
                      <Card.Content>
                      <Card.Header>{product.name}</Card.Header>
                      <Card.Meta>Quantity: {product.quantity} </Card.Meta>
                      <Card.Meta>Price: {product.price * product.quantity} </Card.Meta>
                      <Card.Description>{product.description}</Card.Description>
                      </Card.Content>
                    </Card>
                  )
                })}
                <div>
                  {isAdmin && (
                    <div>
                      <Button content='cancel' color='red' name={this.props.userOrder.id} onClick={this.orderCancelled} icon='cancel' labelPosition='left'/>
                      <Button content='next status' color='olive' name={this.props.userOrder.id} value={order.status} onClick={this.orderStatus} icon='right arrow' labelPosition='right'/>
                    </div>
                  )}
                </div>
                {
                  isAdmin ?
                  <Link to={`/dashboard/orders`}><Button content='Back to Order'/></Link> :
                  <Link to={`/users/${this.props.match.params.userId}/orders`}><Button content='Back To Your Orders'/></Link>
                }
              </div>
          </Container>
          <div>
            {isAdmin ? (
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
      )
    } else {
      return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
