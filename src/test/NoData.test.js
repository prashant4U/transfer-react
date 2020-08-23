import NoData from '../components/NoData'

import React from 'react'
import render from 'riteway/render-component'
import { describe } from 'riteway'

describe('rendering NoData Component', async assert => {
  const $ = render(<NoData className="test-component" />)
  //console.log($('.test-component'))
  assert({
    given: 'NoData Components without props =>',
    should: 'render html markup without error',
    actual: $('.test-component').length,
    expected: 1
  })

  const jqTestFirst = render(
    <NoData title="No Data Found" className="test-component" />
  )
  assert({
    given: 'NoData Components with props as title =>',
    should: 'render html markup with specified title',
    actual: jqTestFirst('.test-component')
      .find('.text-muted')
      .html()
      .trim(),
    expected: 'No Data Found'
  })
})
