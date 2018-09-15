import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {expect} from 'chai'
import {Cart} from './Cart'
import LineItem from './LineItem'

enzyme.configure({adapter: new Adapter()})

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
  it('renders a cart component', () => {
    const wrapper = shallow(<Cart cart={cart} />)
    expect(wrapper.find('#cart')).to.have.lengthOf(1)
  })
  it('renders a <LineItem /> component for every item in the cart', () => {
    const wrapper = shallow(<Cart cart={cart} />)
    const lineItemComp = wrapper.find(LineItem)
    expect(lineItemComp.length).to.equal(2)
  })
})
