import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const GOT_PRODUCTS = 'GOT_PRODUCTS'

/**
 * INITIAL STATE
 */

const initialState = {
  allProducts: [],
  newProduct: {},
  changedProduct: {},
  productId: 0,
}

/**
 * ACTION CREATORS
 */

const gotProducts = allProducts => {
  return {
    type: GOT_PRODUCTS,
    allProducts
  }
}

const addProduct = newProduct => ({
  type: ADD_PRODUCT,
  newProduct,
})

const editProduct = changedProduct => ({
  type: EDIT_PRODUCT,
  changedProduct,
})

const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId: Number(productId)
})


/**
 * THUNK CREATORS
 */

export const getProducts = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/products')
    dispatch(gotProducts(data))
  }
}

export const productAdd = newProduct => async dispatch => {
  try {
    const response = await axios.post('/api/products', newProduct);
    const product = response.data;
    const action = addProduct(product);
    dispatch(action)
  } catch (err) {
    next(err)
  }
}

export const productEdit = changedProduct => async dispatch => {
  try {
    const response = await axios.put(`/api/products/${changedProduct.id}`, changedProduct);
    const product = response.data;
    const action = editProduct(product);
    dispatch(action)
  } catch (err) {
    next(err)
  }
}

export const productRemove = productId => async dispatch => {
  try {
    await axios.delete(`/api/products/${productId}`)
    const action = removeProduct(productId)
    dispatch(action)
  } catch (err) {
    next(err)
  }
}

/**
 * REDUCER
 */

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return { ...state, allProducts: action.allProducts }
    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.newProduct]};
    case EDIT_PRODUCT:
      return {...state, products: [...state.products].map(product => {
        if (product.id === action.changedProduct.id) {
          return action.changedProduct
        } else {
          return product
        }
      })};
    case REMOVE_PRODUCT:
      return {...state, products: [...state.products].filter(product => {
        return product.id !== action.productId
      })};
    default:
      return state
  }
}

export default productsReducer
