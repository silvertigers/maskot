import {expect} from 'chai'
import React from 'react'
import {Provider} from 'react-redux'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AdminProducts from './admin-products'
import store from '../store'

const sinon = require('sinon');

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Dashboard, product list', () => {
  let adminProducts
  let adminProductComp

  beforeEach(() => {
    adminProducts = shallow(
    <Provider store={store}>
      <AdminProducts products={[]}/>
    </Provider>)
    adminProductComp = adminProducts.instance()
  })

  it('has class name as admin product list', () => {
    expect(adminProductComp).to.exist
    adminProducts.setState({isAdd: true})
    expect(adminProductComp.state.isAdd).to.equal(true)
  })
})
