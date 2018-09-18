/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {getOrders} from './orders'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Thunks', () => {
  let store
  let mockAxios

  const initialState = {
    allOrders: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getOrders', () => {
    it('eventually dispatches the GET ORDERS action', async () => {
      const fakeOrders = [{one: 'one'}, {two: 'two'}, {three: 'three'}]
      mockAxios.onGet('/api/users/2/orders').replyOnce(200, fakeOrders)
      await store.dispatch(getOrders())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ORDERS')
      expect(actions[0].allOrders).to.be.deep.equal(fakeOrders)
    })
  })
})
