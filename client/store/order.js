import axios from 'axios'

const GOT_ORDER = 'GOT_ORDER'
const EDIT_ORDER = 'EDIT_ORDER'

const gotOrder = order => ({
  type: GOT_ORDER,
  order
})

const editOrder = order => ({
  type: EDIT_ORDER,
  order
})

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

export const getOrder = (orderId, userId) => {
  return async dispatch => {
    if (userId) {
      const {data} = await axios.get(`/api/users/${userId}/orders/${orderId}`)
      dispatch(gotOrder(data))
    } else {
      const response = await axios.get(`/api/admin/orders/${orderId}`)
      const oneOrder = response.data
      const action = gotOrder(oneOrder)
      dispatch(action)
    }
  }
}

export const postUserOrder = (order, cart) => {
  return async dispatch => {
    const {data} = await axios.post(`/api/users/orders`, {order, cart})
    const action = gotOrder(data)
    dispatch(action)
  }
}

export const postGuestOrder = (order, cart) => {
  return async dispatch => {
    const {data} = await axios.post(`/api/guests/orders`, {order, cart})
    const action = gotOrder(data)
    dispatch(action)
  }
}

const initialState = {}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDER:
      return action.order
    case EDIT_ORDER:
      return {
        ...state,
        orders: [...state.orders].map(order => {
          return order.id === action.order.id ? action.order : order
        }),
        order: action.order
      }
    default:
      return state
  }
}

export default ordersReducer
