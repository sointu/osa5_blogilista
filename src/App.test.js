import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
    //  () => component.getByText('login')
      () => component.container.querySelector('.userLogged')
    )
    await waitForElement(
      () => component.container.querySelector('.blogItems')
    )
    // expectations here
    const userLogged = component.container.querySelector('.userLogged')
    expect(userLogged).not.toHaveTextContent()
    const renderedBlogs = component.container.querySelectorAll('.blogItems')
    expect(renderedBlogs.length).toBe(0)

  })
})