import axios from 'axios'

const GET_ORDER = "GET_ORDER"

const initialState = {
  orders: [],
}

const getOrder = orders => ({
  type: GET_ORDER,
  orders
})

export const gotOrder = () => async dispatch => {
  try {
    const response = await axios.get('/api/admin/orders')
    const allOrder = response.data
    const action = getOrder(allOrder)
    dispatch(action)
  } catch(err) {
    console.error(err)
  }
}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return { ...state, orders: action.orders.sort((a, b) => a.id > b.id)}
    default:
      return state
  }
}

export default ordersReducer
