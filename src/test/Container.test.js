import Container from '../components/Container'

import React from 'react'
import render from 'riteway/render-component'
import { describe } from 'riteway'

describe('rendering Container Component', async assert => {
  const $ = render(<Container className="test-component" />)
  assert({
    given: 'Container Components without props =>',
    should: 'render html markup without error',
    actual: $('.test-component').length,
    expected: 1
  })

  const jqTestFirst = render(
    <Container title="source" className="test-component" />
  )

  assert({
    given: 'Container Components with props as title =>',
    should: 'render html markup with specified title',
    actual: jqTestFirst('label#custom-title').html(),
    expected: 'source'
  })

  const jqTestSecond = render(
    <Container
      id="testChecked"
      className="test-component"
      listItems={[
        {
          key: 1,
          isSource: true,
          selected: false,
          title: 'Item 1'
        },
        {
          key: 2,
          isSource: true,
          selected: false,
          title: 'Item 2'
        }
      ]}
    />
  )

  assert({
    given: 'Container Components with listItems props =>',
    should: 'render html list markup with provided listItems',
    actual: jqTestSecond('.row').length,
    expected: 2
  })

  const jqTestThird = render(
    <Container id="testChecked" className="test-component" listItems={[]} />
  )

  assert({
    given: 'Container Components with empty listItems props =>',
    should: 'render html list markup with No Data as Text',
    actual: jqTestThird('.test-component')
      .find('.text-muted')
      .html()
      .trim(),
    expected: 'No Data'
  })
})
