import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import users from './users'
import products from './products'
import product from './product'
import cart from './cart'
import category from './category'
import session from './session'
import order from './order'
import orders from './orders'

const reducer = combineReducers({
  user,
  users,
  products,
  product,
  cart,
  category,
  order,
  orders,
  session
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
