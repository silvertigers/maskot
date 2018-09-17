import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AdminHome from './admin-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Dashboard Home for Admin', () => {
  let adminHome

  beforeEach(() => {
    adminHome = shallow(<AdminHome />)
  })
  it('renders the dashboard menu in an h1', () => {
    expect(adminHome.find('h1').text()).to.be.equal(
      'This is a Dashboard page for Admin'
    )
  })
})
