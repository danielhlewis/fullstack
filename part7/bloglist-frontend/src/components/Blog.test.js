import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const addLike = jest.fn()
  const removeBlog = jest.fn()
  const username = 'Firstname Lastname'
  const blogObject = {
    title: 'Catchy Blog Yitle',
    author: 'Author Blogman',
    url: 'http://bloggityblogblog.blog/blog',
    user: {
      name: 'Creator Name',
      username: 'xx420BlazeItxx',
      id: '5ea4d4f292a4f245f498f929'
    }
  }

  beforeEach(() => {
    component = render(
      <Blog blog={ blogObject }
        addLike={ addLike }
        removeBlog={ removeBlog }
        username={ username }
      />
    )
  })

  test('renders title and author', () => {
    expect(
      component.container.querySelector('.titleAndAuthor')
    ).toBeDefined()
  })

  test('at start the url and likes are hidden', () => {
    const detailsDiv = component.container.querySelector('.details')

    expect(detailsDiv).toHaveStyle('display: none')
  })

  test('clicking show reveals details', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const detailsDiv = component.container.querySelector('.details')

    expect(detailsDiv).not.toHaveStyle('display: none')
  })

  test('clicking like fires addLike', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})