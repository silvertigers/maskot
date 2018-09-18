import axios from 'axios'
import { getProduct } from './product'

/**
 * ACTION TYPES
 */
const CLEAR_REVIEW_FORM = 'CLEAR_REVIEW_FORM'
const SET_REVIEW_TITLE = 'SET_REVIEW_TITLE'
const SET_REVIEW_RATING = 'SET_REVIEW_RATING'
const SET_REVIEW_COMMENTS = 'SET_REVIEW_COMMENTS'
const SET_USER_ID = 'SET_USER_ID'

/**
 * INITIAL STATE
 */

const initialState = {
  newReview: {}
}

/**
 * ACTION CREATORS
 */

const clearReviewForm = () => {
  return {
    type: CLEAR_REVIEW_FORM
  }
}

export const setReviewTitle = (title) => {
  return {
    type: SET_REVIEW_TITLE,
    title
  }
}

export const setReviewRating = (rating) => {
  return {
    type: SET_REVIEW_RATING,
    rating
  }
}

export const setReviewComments = (comments) => {
  return {
    type: SET_REVIEW_COMMENTS,
    comments
  }
}

export const setUserId = (userId) => {
  return {
    type: SET_USER_ID,
    userId
  }
}

/**
 * THUNK CREATORS
 */

export const addReview = (newReview, productId) => {
  return async (dispatch) => {
    await axios.post(`/api/products/${productId}/review`, { newReview })
    dispatch(getProduct(productId))
    dispatch(clearReviewForm())
  }
}


const newReview = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_ID:
      return {
        ... state,
        newReview: {
          ...state.newReview,
          userId: action.userId
        }
      }
    case CLEAR_REVIEW_FORM:
      return {
        ...state,
        newReview: initialState.newReview
      }
    case SET_REVIEW_TITLE:
      return {
        ...state,
        newReview: {
          ...state.newReview,
          title: action.title
        }
      }
    case SET_REVIEW_RATING:
      return {
        ...state,
        newReview: {
          ...state.newReview,
          rating: action.rating
        }
      }
    case SET_REVIEW_COMMENTS:
      return {
        ...state,
        newReview: {
          ...state.newReview,
          comments: action.comments
        }
      }
    default:
      return state
  }
}

export default newReview
