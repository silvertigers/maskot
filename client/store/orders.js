import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'
const EDIT_ORDER = 'EDIT_ORDER'

const initialState = []

const gotOrders = orders => {
  return {
    type: GOT_ORDERS,
    orders
  }
}

export const getOrders = userId => async dispatch => {
  try {
    if (userId) {
      const {data} = await axios.get(`/api/users/${userId}/orders`)
      dispatch(gotOrders(data))
    } else {
      const response = await axios.get('/api/admin/orders')
      const allOrder = response.data
      const action = gotOrders(allOrder)
      dispatch(action)
    }
  } catch (err) {
    console.error(err)
  }
}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders.sort((a, b) => a.id > b.id)
    default:
      return state
  }
}

export default ordersReducer
