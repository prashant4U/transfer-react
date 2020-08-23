import ActionControls from '../components/ActionControls'

import React from 'react'
import render from 'riteway/render-component'
import { describe } from 'riteway'

describe('rendering ActionControls Component', async assert => {
  const $ = render(
    <ActionControls activateSourceAction={true} activateTargetAction={false} />
  )
  //console.log($('.test-component'))
  assert({
    given: 'ActionControls Components without props =>',
    should: 'render html markup without error',
    actual: $('.test-component').length,
    expected: 1
  })

  assert({
    given:
      'ActionControls Components with props as source action button css =>',
    should: 'render html markup with source button css',
    actual: $('.test-component')
      .find('button#moveToRight')
      .hasClass('btn-primary'),
    expected: true
  })

  assert({
    given:
      'ActionControls Components with props as target action button css =>',
    should: 'render html markup with target button css',
    actual: $('.test-component')
      .find('button#moveToLeft')
      .hasClass('btn-light'),
    expected: true
  })
})
