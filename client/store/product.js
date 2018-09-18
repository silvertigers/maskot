import axios from 'axios'

const GOT_PRODUCT = 'GOT_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

// ACTION CREATORS

const gotProduct = product => {
  return {
    type: GOT_PRODUCT,
    product
  }
}

export const getProduct = productId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(gotProduct(data))
  }
}

export const removeProduct = () => ({type: REMOVE_PRODUCT})

export const addReview = (newReview, productId) => {
  return async (dispatch) => {
    await axios.post(`/api/products/${productId}/review`, {newReview})
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(gotProduct(data))
  }
}

var initialState = {}

// REDUCERS

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.product
    case REMOVE_PRODUCT:
      return initialState.product
    default:
      return state
  }
}
