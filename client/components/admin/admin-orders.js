import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu,Button,List,Segment,Select,Dropdown} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {editedOrder} from '../../store/order'
import {getOrders} from '../../store/orders'
import AdminOrderCard from './admin-order-card'

class AdminOrders extends Component {
  constructor() {
    super()
    this.state = {
      filtered: '',
      activeItem: 'List'
    }
    this.orderFilter = this.orderFilter.bind(this)
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

  render() {
    var { orders } = this.props.orders
    const { activeItem } = this.state

    return (
      <div>
        <div className="admin_Order_List">
        <Menu tabular>
          <Menu.Item name="List" active={activeItem === 'List'} onClick={this.handleItemClick}/>
          <Menu.Item name="placed" active={activeItem === 'placed'} onClick={this.handleItemClick}/>
          <Menu.Item name="in process" active={activeItem === 'in process'} onClick={this.handleItemClick}/>
          <Menu.Item name="completed" active={activeItem === 'completed'} onClick={this.handleItemClick}/>
          <Menu.Item name="cancelled" active={activeItem === 'cancelled'} onClick={this.handleItemClick}/>
        </Menu>

        <h2>Order list</h2>
        <ul>
        {
          this.props.orders[0] ?
          this.props.orders.map(order => {
            if (order.status === this.state.filtered || !this.state.filtered) {
              return (
                <div key={order.id} className='single-user-card'>
                <Segment>
                  <List.Item>
                  <List.Content>
                    <List.Header>
                    <Link to={`/users/${order.user.id}/orders/${order.id}`}>
                    <div className="linkColor">
                    <h2>{order.user ? order.user.email : order.email}</h2>
                    </div>
                    </Link>
                    </List.Header>
                  <h2>status: {order.status}</h2>
                  {/* <Dropdown fluid selection options={[{text: "placed", value: "placed"}, {text:"in process", value: "in process"}, {text: "completed", value: "completed"}, {text: "cancelled", value: "cancelled"}]} defaultValue={order.status} name={order.id} onChange={this.changeOrderStatus} /> */}
                  <select name={order.id} onChange={this.changeOrderStatus} value={order.status}>
                    <option value="placed">Placed</option>
                    <option value="in process">in process</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {
                    !(order.status === "completed" || order.status === "cancelled") &&
                    <div>
                      <Button content='Cancelled' color='red' name={order.id} onClick={this.orderCancelled} icon='cancel' labelPosition='left' />
                      <Button content='Next' color='olive' name={order.id} value={order.status} onClick={this.orderStatus} icon='right arrow' labelPosition='right'/>
                    </div>
                  }
                  </List.Content>
                  </List.Item>
                </Segment>
                </div>
              )
            }
          }) :
          <h2>None of products are available at this time</h2>
        }
        {/* </ul>
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
                  return <AdminOrderCard key={order.id} order={order} />
                }
              })
            ) : (
              <h2>No products are available at this time</h2>
            )} */}
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
