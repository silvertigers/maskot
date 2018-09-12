import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AdminProducts} from './admin-products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Dashboard, product list', () => {
  let adminProducts

  beforeEach(() => {
    adminProducts = shallow(<AdminProducts />)
  })

  it('has class name as admin product list', () => {
    expect(adminProducts.is("div")).to.be.true
  })
})
