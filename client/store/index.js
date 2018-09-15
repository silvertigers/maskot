import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user, {LOG_OUT} from './user'
import users from './users'
import products from './products'
import product from './product'
import cart from './cart'
import category from './category'
import order from './order'

const reducer = combineReducers({
  user,
  users,
  products,
  product,
  cart,
  category,
  order
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined
  }
  return reducer(state, action)
}

const store = createStore(rootReducer, middleware)

export default store
export * from './user'
