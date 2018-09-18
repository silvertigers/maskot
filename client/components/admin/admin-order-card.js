import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {editedOrder} from '../../store/order'

class AdminOrderCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.order.status
    }
    this.changeOrderStatus = this.changeOrderStatus.bind(this)
    this.orderCancelled = this.orderCancelled.bind(this)
    this.orderStatus = this.orderStatus.bind(this)
  }

  async changeOrderStatus(event) {
    const updatedData = {
      id: event.target.name,
      status: event.target.value
    }
    this.setState({status: event.target.value})
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
    this.setState({status: event.target.value})
    await this.props.editOrder(orderStatus)
  }

  render() {
    const {id, email, userId, sessionId, status} = this.props.order
    return (
      <li key={id}>
        {userId ? (
          <Link to={`/users/${userId}/orders/${id}`}>
            <h3>{email}</h3>
          </Link>
        ) : (
          <Link to={`/guests/${sessionId}/orders/${id}`}>
            <h3>{sessionId}</h3>
          </Link>
        )}

        <h2>status: {status}</h2>
        <select
          name={id}
          onChange={this.changeOrderStatus}
          value={this.state.status}
        >
          <option value="placed">Placed</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        {!(status === 'completed' || status === 'cancelled') && (
          <div>
            <button name={id} onClick={this.orderCancelled} type="button">
              Cancel
            </button>
          </div>
        )}
      </li>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editOrder: order => dispatch(editedOrder(order))
  }
}

export default connect(null, mapDispatchToProps)(AdminOrderCard)
