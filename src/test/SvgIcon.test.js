import SvgIcon from '../components/SvgIcon'

import React from 'react'
import render from 'riteway/render-component'
import { describe } from 'riteway'

describe('rendering SvgIcon Component', async assert => {
  const $ = render(<SvgIcon className="test-component" />)
  //console.log($('.test-component'))
  assert({
    given: 'SvgIcon Components without props =>',
    should: 'render html markup without error',
    actual: $('.test-component').length,
    expected: 1
  })
})
