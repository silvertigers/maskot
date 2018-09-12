import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'
const GOT_PRODUCT = 'GOT_PRODUCT'

// ACTION CREATORS

const gotProduct = product => {
  return {
    type: GET_PRODUCT,
    product: product
  }
}

export const getProduct = productId => {
  return async dispatch => {
    const {data} = await axios.get(`api/products/${productId}`)
    dispatch(gotProduct(data))
  }
}

var initialState = {}

// REDUCERS

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.product
    default:
      return state
  }
}
