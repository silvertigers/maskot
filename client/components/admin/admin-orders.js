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
    console.log('filter', this.state.filtered)
    this.setState({
      filtered: filterWord
    })
  }

  render() {
    const {activeItem} = this.state
    return (
      <div>
        <div className="admin_Order_List">
          <Menu tabular>
            <Menu.Item
              name="List"
              active={activeItem === 'List'}
              onClick={this.orderFilter}
            />
            <Menu.Item
              name="placed"
              active={activeItem === 'placed'}
              onClick={this.orderFilter}
            />
            <Menu.Item
              name="in process"
              active={activeItem === 'in process'}
              onClick={this.orderFilter}
            />
            <Menu.Item
              name="completed"
              active={activeItem === 'completed'}
              onClick={this.orderFilter}
            />
            <Menu.Item
              name="cancelled"
              active={activeItem === 'cancelled'}
              onClick={this.orderFilter}
            />
          </Menu>

          <h2>Order list</h2>
          <ul>
            {console.log('this.props.orders', this.props.orders)}
            {this.props.orders[0] ? (
              this.props.orders.map(order => {
                return (
                  (order.status === this.state.filtered ||
                    !this.state.filtered) && (
                    <AdminOrderCard key={order.id} order={order} />
                  )
                )
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
