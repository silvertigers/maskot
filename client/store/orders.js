import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'
const GOT_ORDER = 'GOT_ORDER'

/**
 * INITIAL STATE
 */

const initialState = {
  userOrders: [],
  userOrder: {}
}

/**
 * ACTION CREATORS
 */

const gotOrders = userOrders => {
  return {
    type: GOT_ORDERS,
    userOrders
  }
}

const gotOrder = userOrder => {
  return {
    type: GOT_ORDER,
    userOrder
  }
}

/**
 * THUNK CREATORS
 */

export const getOrders = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${userId}/orders`)
    dispatch(gotOrders(data))
  }
}

export const getOrder = (userId, orderId) => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${userId}/orders/${orderId}`)
    dispatch(gotOrder(data))
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

/**
 * REDUCER
 */

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDERS:
      return {...state, userOrders: action.userOrders}
    case GOT_ORDER:
      return {...state, userOrder: action.userOrder}
    default:
      return state
  }
}

export default ordersReducer
