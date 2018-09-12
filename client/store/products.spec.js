/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import { getProducts, gotProducts } from './products'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Thunks', () => {
  let store
  let mockAxios

  const initialState = {
    products: [],
    productError: '',
    isFetching: true,
    error: ''
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProducts', () => {
    it('eventually dispatches the GET PRODUCTS action', async () => {
      const fakeProducts = [{one: 'one'}, {two: 'two'}, {three: 'three'}]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(getProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
  })
})
