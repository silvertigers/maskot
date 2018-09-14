import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import {Cart} from './Cart'
import LineItem from './LineItem'

// describe('<Cart/> Component', () => {
//   const cart = [
//     {
//       product: {id: 1, name: 'mask', price: 1.5, description: 'cool'},
//       quantity: 10
//     },
//     {
//       product: {id: 2, name: 'cute mask', price: 3, description: 'amazing'},
//       quantity: 4
//     }
//   ]
//   it('accepts props', () => {
//     const wrapper = shallow(<Cart cart={cart} />)
//     expect(wrapper.props().cart).to.deep.equal(cart)
//   })
//   it('renders a <LineItem /> component for every item in the cart')
// })
