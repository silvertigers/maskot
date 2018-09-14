import React from 'react'
import {shallow} from 'enzyme'
import sinon from 'sinon'
import chai, {expect} from 'chai'
import sinonChai from 'sinon-chai'
import Cart from './Cart'
import LineItem from './LineItem'
chai.use(sinonChai)

describe('<Cart/> Component', () => {
  const cart = [
    {
      product: {id: 1, name: 'mask', price: 1.5, description: 'cool'},
      quantity: 10
    },
    {
      product: {id: 2, name: 'cute mask', price: 3, description: 'amazing'},
      quantity: 4
    }
  ]
  it('accepts props')
  it('renders a <LineItem /> component for every item in the cart')
})
