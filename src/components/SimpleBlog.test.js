import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const simpleBlog = {
    title: 'Blogin otsikko',
    author: 'Blogin Kirjoittaja',
    likes: 5
  }

  const component = render(
    <SimpleBlog blog={simpleBlog} />
  )

  const div1 = component.container.querySelector('.blogContent')
  expect(div1).toHaveTextContent(
    'Blogin otsikko'
  )
  const div2 = component.container.querySelector('.blogContent')
  expect(div2).toHaveTextContent(
    'Blogin Kirjoittaja'
  )
  const div3 = component.container.querySelector('.blogLikes')
  expect(div3).toHaveTextContent(
    'blog has 5 likes'
  )
})

test('clicking the button twice calls event handler twice', async () => {
  const simpleBlog = {
    title: 'Blogin otsikko',
    author: 'Blogin Kirjoittaja',
    likes: 5
  }
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={simpleBlog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})