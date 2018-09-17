import axios from 'axios'

/**
 * ACTION TYPES
 */
const ALL_USER = 'ALL_USER'
const ADD_USER = 'ADD_USER'
const TOGGLE_USER = 'TOGGLE_USER'
const DELETE_USER = 'DELETE_USER'
const TEMP_PASSWORD = 'TEMP_PASSWORD'

/**
 * INITIAL STATE
 */
const initialState = {
  users: [],
  user: {},
}


/**
 * ACTION CREATORS
 */
const getUser = users => ({
  type: ALL_USER,
  users
})

const addUser = newUser => ({
  type: ADD_USER,
  newUser,
})

const toggleAdmin = user => ({
  type: TOGGLE_USER,
  user,
})

const removeUser = userId => ({
  type: DELETE_USER,
  userId: Number(userId),
})

const tempPassword = tempPW => ({
  type: TEMP_PASSWORD,
  tempPW
})

/**
 * THUNK CREATORS
 */
export const gotUser = () => async dispatch => {
  try {
    const response = await axios.get('/api/admin/users')
    const users = response.data
    const action = getUser(users)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const userAdd = user => async dispatch => {
  try {
    const response = await axios.post('/api/admin/users', user)
    const createdUser = response.data
    const action = addUser(createdUser)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const changeAuthority = user => async dispatch => {
  try {
    const userId = user.id
    const response = await axios.put(`/api/admin/users/${userId}`, user)
    const changedUser = response.data
    const action = toggleAdmin(changedUser)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const userRemove = userId => async dispatch => {
  try {
    await axios.delete(`/api/admin/users/${userId}`)
    const action = removeUser(userId)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const userTempPassword = user => async dispatch => {
  try {
    const userId = user.id
    const { data } = await axios.put(`/api/admin/users/${userId}`, user)
    const action = tempPassword(data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ALL_USER:
      return {...state, users: action.users}
    case ADD_USER:
      return {...state, users: [...state.users, action.newUser]}
    case TOGGLE_USER:
      return {...state, users: [...state.users].map(user => {
        if (user.id === action.user.id) {
          return action.user
        } else {
          return user
        }
      })}
    case DELETE_USER:
      return {...state, users: [...state.users].filter(user => {
        return user.id !== action.userId
      })}
    case TEMP_PASSWORD:
      return {...state, users: state.users}
    default:
      return state
  }
}
