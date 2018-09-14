import axios from 'axios'

const GET_CATEGORIES = "GET_CATEGORIES"
const ADD_CATEGORY = "ADD_CATEGORY"

const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

const newCategory = category => ({
  type: ADD_CATEGORY,
  category
})

const initialState = {
  categories: [],
  category: {}
}

export const gotCategories = () => async dispatch => {
  try {
    const response = await axios.get('/api/categories')
    const allCategories = response.data
    const action = getCategories(allCategories)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const addCategory = category => async dispatch => {
  try {
    const response = await axios.post('/api/categories', category)
    const addedCategory = response.data
    const action = newCategory(addedCategory)
    dispatch(action)
  } catch(err) {
    console.error(err)
  }
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {...state, categories: action.categories}
    case ADD_CATEGORY:
      return {...state, categories: [...state.categories, action.category]}
    default:
      return state
  }
}

export default categoriesReducer
