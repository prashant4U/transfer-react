import CheckBox from '../components/CheckBox'

import React from 'react'
import render from 'riteway/render-component'
import { describe } from 'riteway'

describe('rendering CheckBox Component', async assert => {
  const $ = render(<CheckBox className="test-component" />)
  //console.log($('.test-component'))
  assert({
    given: 'CheckBox Components without props =>',
    should: 'render html markup without error',
    actual: $('.test-component').length,
    expected: 1
  })

  const jqTestFirst = render(
    <CheckBox id="testing" className="test-component" />
  )
  assert({
    given: 'CheckBox Components with props as id =>',
    should: 'render html markup with specified id',
    actual: jqTestFirst('input#testing').length,
    expected: 1
  })

  const jqTestSecond = render(
    <CheckBox
      id="testChecked"
      className="test-component"
      item={{ selected: true }}
    />
  )

  assert({
    given: 'CheckBox Components with props to select as checked =>',
    should: 'render html markup with CheckBox checked',
    actual: jqTestSecond('input#testChecked').prop('checked') === true,
    expected: true
  })
})
