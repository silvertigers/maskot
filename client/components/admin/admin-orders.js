import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu} from 'semantic-ui-react'
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
    const word = event.target.name
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

  handleItemClick = (e, {name}) =>
    name === 'List'
      ? this.setState({
          activeItem: name,
          filtered: ''
        })
      : this.setState({
          activeItem: name,
          filtered: name
        })

  render() {
    const {activeItem} = this.state

    return (
      <div>
        <div className="admin_Order_List">
          <Menu tabular>
            <Menu.Item
              name="All"
              active={activeItem === 'List'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="placed"
              active={activeItem === 'placed'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="processing"
              active={activeItem === 'processing'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="completed"
              active={activeItem === 'completed'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="cancelled"
              active={activeItem === 'cancelled'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </div>
        <div className="orderPage">
          <h2>Order list</h2>
          <ul>
            {this.props.orders[0] ? (
              this.props.orders.map(order => {
                if (
                  order.status === this.state.filtered ||
                  !this.state.filtered
                ) {
                  return <AdminOrderCard key={order.id} order={order} />
                }
              })
            ) : (
              <h2>None of products are available at this time</h2>
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
