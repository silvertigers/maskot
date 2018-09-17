import axios from 'axios'

const GET_ORDER = 'GET_ORDER'
const EDIT_ORDER = 'EDIT_ORDER'

const initialState = {
  orders: [],
  order: {}
}

const getOrder = orders => ({
  type: GET_ORDER,
  orders
})

const editOrder = order => ({
  type: EDIT_ORDER,
  order
})

export const gotOrder = () => async dispatch => {
  try {
    const response = await axios.get('/api/admin/orders')
    const allOrder = response.data
    const action = getOrder(allOrder)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const editedOrder = order => async dispatch => {
  try {
    const id = order.id
    const response = await axios.put(`/api/admin/orders/${id}`, order)
    const result = response.data
    const action = editOrder(result)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {...state, orders: action.orders.sort((a, b) => a.id > b.id)}
    case EDIT_ORDER:
      return {
        ...state,
        orders: [...state.orders].map(order => {
          return order.id === action.order.id ? action.order : order
        })
      }
    default:
      return state
  }
}

export default ordersReducer
