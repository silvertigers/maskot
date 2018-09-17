/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {productAdd, productEdit, productRemove} from './products'
import history from '../history'
import {getProducts, gotProducts} from './products'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Thunks', () => {
  let store
  let mockAxios

  const initialState = {
    newProduct: {},
    changedProduct: {},
    productid: 0,
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

  describe('productAdd', () => {
    it('eventually dispatches the Add Product action', async () => {
      const fakeProduct = {
        title: "new product",
      }
      mockAxios.onPost(`/api/admin/products`).replyOnce(200, fakeProduct)
      await store.dispatch(productAdd(fakeProduct))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_PRODUCT')
      expect(actions[0].newProduct).to.be.deep.equal(fakeProduct)
      expect(actions[0].newProduct.title).to.be.equal("new product")
    })
  })

  describe('productRemove', () => {
    it('eventually dispatches the Remove Product action', async () => {
      const fakeProduct = [{
        id: 1,
        one: 'one'
      },{
        id: 2,
        two: 'two'
      },{
        id: 3,
        three: 'three'
      }]

      mockAxios.onDelete('/api/admin/products/1').replyOnce(204, fakeProduct)
      await store.dispatch(productRemove(1))
      const actions = store.getActions()

      expect(actions[0].type).to.be.equal('REMOVE_PRODUCT')
      expect(actions[0].productId).to.be.equal(1)
    })
  })
})
