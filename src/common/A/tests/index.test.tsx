import 'jest-dom/extend-expect'
import * as React from 'react'
import { render } from 'react-testing-library'

import A from '..'

const href = 'https://example.com/'
const textContent = 'Test'
const children = <h1>{`${textContent}`}</h1>

const renderAnchorComponent = (props = {}) => {
  const utils = render(
    <A href={href} {...props}>
      {children}
    </A>
  )

  // utils.getByLabelText(/title/i).value = fakePost.title
  // utils.getByLabelText(/content/i).value = fakePost.content
  // utils.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  // const submitButton = utils.getByText(/submit/i)
  return {
    ...utils,
  }
}

describe('<A />', () => {
  it('should render an <a> tag', () => {
    const { container } = renderAnchorComponent()
    expect(container.firstElementChild.nodeName.toLowerCase()).toEqual('a')
  })

  it('should have an href attribute', () => {
    const { container } = renderAnchorComponent()
    expect((container.firstChild as HTMLAnchorElement).href).toEqual(href)
  })

  it('should have children', () => {
    const { container } = renderAnchorComponent()
    expect(container.firstElementChild).toHaveTextContent(textContent)
  })

  it('should have a className attribute', () => {
    const className = 'test'
    const { container } = renderAnchorComponent({ className })
    expect(container.firstChild).toHaveClass(className)
  })

  it('should adopt a target attribute', () => {
    const target = '_blank'
    const { container } = renderAnchorComponent({ target })
    expect(container.firstChild).toHaveAttribute('target', target)
  })

  it('should adopt a type attribute', () => {
    const type = 'text/html'
    const { container } = renderAnchorComponent({ type })
    expect(container.firstChild).toHaveAttribute('type', type)
  })
})
