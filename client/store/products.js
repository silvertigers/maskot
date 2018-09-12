import axios from 'axios'

// ACTION TYPES

const GOT_PRODUCTS = 'GOT_PRODUCTS'

// ACTION CREATORS

const gotProducts = products => {
  return {
    type: GOT_PRODUCTS,
    products
  }
}

// THUNKS

export const getProducts = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products`)
    dispatch(gotProducts(data))
  }
}

// REDUCERS

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productsReducer
