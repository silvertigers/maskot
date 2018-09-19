import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {editedOrder, getOrder} from '../../store/order'
import {Button, List, Segment, Select} from 'semantic-ui-react'

const statuses = [
  {key: 'placed', value: 'placed', text: 'Placed'},
  {key: 'processing', value: 'processing', text: 'Processing'},
  {key: 'completed', value: 'completed', text: 'Completed'},
  {key: 'cancelled', value: 'cancelled', text: 'Cancelled'}
]

class AdminOrderCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.order.status
    }
    this.changeOrderStatus = this.changeOrderStatus.bind(this)
    this.orderCancelled = this.orderCancelled.bind(this)
    this.nextStatus = this.nextStatus.bind(this)
  }

  componentDidMount() {
    if (this.props.match) {
      const {orderId} = this.props.match.params
      const {userId} = this.props.match.params
      !this.props.admin && this.props.getOrder(orderId, userId)
    }
  }

  async changeOrderStatus(e, {value}) {
    const updatedData = {
      id: this.props.order.id,
      status: value
    }
    this.setState({status: value})
    await this.props.editOrder(updatedData)
  }

  async orderCancelled(event) {
    const cancelOrder = {
      id: event.target.name,
      status: 'cancelled'
    }
    this.setState({status: event.target.value})
    await this.props.editOrder(cancelOrder)
  }

  async nextStatus(event) {
    var statuslist = ['placed', 'processing', 'completed']
    var current = statuslist.indexOf(event.target.value)
    if (current === 2) {
      return
    }
    const orderStatus = {
      id: event.target.name,
      status: statuslist[current + 1]
    }
    this.setState({status: statuslist[current + 1]})
    await this.props.editOrder(orderStatus)
  }

  render() {
    const {id, email, userId, sessionId, status} = this.props.order
    return (
      <div key={id} className="single-user-card">
        <Segment>
          <List.Item>
            <List.Content>
              <div className="nav-items order-card">
                <List.Header className="admin-order small-detail">
                  Order {id}
                </List.Header>
                <Select
                  placeholder={this.props.order.status}
                  options={statuses}
                  onChange={this.changeOrderStatus}
                />
              </div>
              <List.Header>
                {userId ? (
                  <Link to={`/users/${userId}/orders/${id}`}>
                    <h3>{email}</h3>
                  </Link>
                ) : (
                  <div className="linkColor">
                    <Link to={`/guests/${sessionId}/orders/${id}`}>
                      <h3>{sessionId}</h3>
                    </Link>
                  </div>
                )}
              </List.Header>
              <List.Description>Status: {status}</List.Description>

              {this.props.order.products &&
                this.props.order.products.map(product => {
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
              {/* <Select
                placeholder={this.props.order.status}
                options={statuses}
                onChange={this.changeOrderStatus}
              /> */}
              {!(status === 'completed' || status === 'cancelled') && (
                <div>
                  <Button
                    content="Cancelled"
                    color="red"
                    name={id}
                    onClick={this.orderCancelled}
                    icon="cancel"
                    labelPosition="left"
                  />
                  <Button
                    content="Next"
                    color="olive"
                    name={id}
                    value={status}
                    onClick={this.nextStatus}
                    icon="right arrow"
                    labelPosition="right"
                  />
                </div>
              )}
            </List.Content>
          </List.Item>
        </Segment>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrder: (userId, orderId) => dispatch(getOrder(userId, orderId)),
    editOrder: order => dispatch(editedOrder(order))
  }
}

export default connect(null, mapDispatchToProps)(AdminOrderCard)
