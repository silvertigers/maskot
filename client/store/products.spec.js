/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {productAdd, productEdit, productRemove} from './products'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    newProduct: {},
    changedProduct: {},
    productid: 0,
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('productAdd', () => {
    it('eventually dispatches the Add Product action', async () => {
      const fakeProduct = {
        title: "new product",
      }
      mockAxios.onPost(`/api/products`).replyOnce(200, fakeProduct)
      await store.dispatch(productAdd(fakeProduct))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_PRODUCT')
      expect(actions[0].newProduct).to.be.deep.equal(fakeProduct)
      expect(actions[0].newProduct.title).to.be.equal("new product")
    })
  })

  // describe('productEdit', () => {
  //   it('eventually dispatches the Edit Product action', async () => {
  //     const currentProduct = {
  //       id: 3,
  //       title: "new product"
  //     }
  //     mockAxios.onPost('/api/products').replyOnce(200, currentProduct)
  //     await store.dispatch(productAdd(currentProduct))

  //     const fakeProduct = {
  //       id: 3,
  //       title: "edit product",
  //     }
  //     mockAxios.onPut(`/api/products/${fakeProduct.id}`, fakeProduct).replyOnce(204, fakeProduct)
  //     await store.dispatch(productEdit(fakeProduct))
  //     const actions = store.getActions()
  //     expect(actions[0].type).to.be.equal('EDIT_PRODUCT')
  //     expect(actions[0].changedProduct).to.be.deep.equal(fakeProduct)
  //   })
  // })

  // describe('productRemove', () => {
  //   it('eventually dispatches the Remove Product action', async () => {
  //     const fakeUser = {email: 'Cody'}
  //     mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
  //     await store.dispatch(me())
  //     const actions = store.getActions()
  //     expect(actions[0].type).to.be.equal('GET_USER')
  //     expect(actions[0].user).to.be.deep.equal(fakeUser)
  //   })
  // })
})
