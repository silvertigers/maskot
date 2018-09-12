import axios from 'axios'

// ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const PRODUCTS_ERROR = 'PRODUCTS_ERROR'

// ACTION CREATORS

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products: products
  }
}

const gotProducts = products => {
  return {
    type: GOT_PRODUCTS
  }
}

const productsError = error => {
  return {
    type: PRODUCTS_ERROR,
    error: error
  }
}

// THUNKS

export const getProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/posts`)
      await dispatch(getProducts(data))
      dispatch(gotProducts())
    } catch (err) {
      dispatch(productError(err))
    }
  }
}

// INITIAL STATE

var initialState = {
  products: [],
  productError: '',
  isFetching: true,
  error: ''
}

// REDUCERS

const productsReducer = (products = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...products,
        products: action.products
      }
    case GOT_PRODUCTS:
      return {
        ...products,
        isFetching: false
      }
    case PRODUCTS_ERROR:
      return {
        ...products,
        error: action.error
      }
    default:
      return products
  }
}
