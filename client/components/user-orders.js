import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'


const mapStateToProps = (state) => {
  return {
    allOrders: state.allOrders,
    userId: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserOrders: () => dispatch(getOrders())
  }
}

class UserOrders extends React.Component {
  componentDidMount(){
    this.props.getUserOrders();
  }

  render() {
    return (
      <ul>
        <li><OrderCard /></li>
      </ul>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
