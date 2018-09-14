import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'

/**
 * INITIAL STATE
 */

const initialState = {
  allOrders: []
}

/**
 * ACTION CREATORS
 */

const gotOrders = allOrders => {
  return {
    type: GOT_ORDERS,
    allOrders
  }
}

/**
 * THUNK CREATORS
 */

export const getOrders = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/users/:userid/orders')
    dispatch(gotOrders(data))
  }
}

/**
 * REDUCER
 */

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDERS:
      return { ...state, allOrders: action.allOrders }
    default:
      return state
  }
}

export default ordersReducer
