//import App from '../components/App'

import React from 'react'
import render from 'riteway/render-component'
import { describe } from 'riteway'

describe('rendering App Component', async assert => {
  const $ = render(<div className="test-component">testing</div>)
  assert({
    given: 'What Component',
    should: 'render markup with provided props',
    actual: $('.test-component')
      .html()
      .trim(),
    expected: 'testing'
  })
})
