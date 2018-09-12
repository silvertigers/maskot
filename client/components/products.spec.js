/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Products} from './products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Products', () => {
  let products

  beforeEach(() => {
    products = shallow(<Products title="hello" />)
  })

  it('renders the product title in an h3', () => {
    expect(products.find('h3').text()).to.be.equal('hello')
  })
})
