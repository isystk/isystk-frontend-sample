import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Logo from '../logo'

test('Logo', () => {
  const wrapper = shallow(<Logo />)
  expect(toJson(wrapper)).toMatchSnapshot()
})
