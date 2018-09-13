import axios from 'axios'

const GOT_PRODUCT = 'GOT_PRODUCT'

// ACTION CREATORS

const gotProduct = product => {
  return {
    type: GOT_PRODUCT,
    product
  }
}

export const getProduct = productId => {
  return async dispatch => {
    // console.log('productId', productId)
    const {data} = await axios.get(`/api/products/${productId}`)
    // console.log('PRODUCT DATA', data)
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
