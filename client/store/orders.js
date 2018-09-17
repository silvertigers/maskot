import axios from 'axios'
// import orderedProducts from '../../server/db'

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
    const {data} = await axios.post(`/api/users/orders`, order)
    await Promise.all(cart.map(item => data.addProducts(item)))
    const action = gotOrder(data)
    dispatch(action)
  }
}

export const postGuestOrder = (order, cart) => {
  return async dispatch => {
    const {data} = await axios.post(`/api/guests/orders`, order)
    console.log('DATA SHOULD BE ORDER INSTANCE', data)
    // await Promise.all(
    //   cart.map(item => {
    //     return orderedProducts.create({
    //       productId: item.product.id,
    //       price: item.product.price,
    //       quantity: item.quantity,
    //       orderId: data.id
    //     })
    //   })
    // )
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
