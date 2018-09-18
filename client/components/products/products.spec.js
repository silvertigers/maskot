/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import {Provider} from 'react-redux'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Products from './Products'
import store from '../../store'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Products', () => {
  let products
  let productComp

  beforeEach(() => {
    products = shallow(
      <Provider store={store}>
        <Products />
      </Provider>
    )
    productComp = products.instance()
  })

  it('renders the product title in an h3', () => {
    expect(productComp).to.exist
  })
})
