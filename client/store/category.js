import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_CATEGORIES = 'GOT_CATEGORIES'
const SELECT_CATEGORY = 'SELECT_CATEGORY'

/**
 * INITIAL STATE
 */

const initialState = {
  categories: [],
  selectedCategory: ''
}

/**
 * ACTION CREATORS
 */

const gotCategories = categories => {
  return {
    type: GOT_CATEGORIES,
    categories
  }
}

export const selectCategory = selectedCategory => {
  return {
    type: SELECT_CATEGORY,
    selectedCategory
  }
}

/**
 * THUNK CREATORS
 */

export const getCategories = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/category')
    dispatch(gotCategories(data))
  }
}

/**
 * REDUCER
 */

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return {...state, categories: action.categories}
    case SELECT_CATEGORY:
      return {...state, selectedCategory: action.selectedCategory}
    default:
      return state
  }
}

export default categoryReducer
