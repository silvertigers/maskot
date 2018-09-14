import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_CATEGORIES = 'GOT_CATEGORIES'
const SELECT_CATEGORY = 'SELECT_CATEGORY'
const ADD_CATEGORY = "ADD_CATEGORY"

/**
 * INITIAL STATE
 */

const initialState = {
  categories: [],
  selectedCategory: 1,
  category: {},
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

const newCategory = category => ({
  type: ADD_CATEGORY,
  category
})

/**
 * THUNK CREATORS
 */

export const getCategories = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/category')
    dispatch(gotCategories(data))
  }
}

export const addCategory = category => async dispatch => {
  try {
    const response = await axios.post('/api/category', category)
    const addedCategory = response.data
    const action = newCategory(addedCategory)
    dispatch(action)
  } catch(err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return {...state, categories: action.categories.sort((a, b) => a.id > b.id)}
    case SELECT_CATEGORY:
      return {...state, selectedCategory: action.selectedCategory}
    case ADD_CATEGORY:
      return {...state, categories: [...state.categories, action.category]}
    default:
      return state
  }
}

export default categoryReducer
