import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm />', () => {

  let component
  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <AddBlogForm createBlog={ createBlog }/>
    )
  })

  test('passes correct values to createBlog', () => {
    const title = 'Catchy Blog Yitle'
    const author = 'Author Blogman'
    const url = 'http://bloggityblogblog.blog/blog'

    const titleInput = component.container.querySelector('#title')
    fireEvent.change(titleInput, {
      target: { value: title }
    })

    const authorInput = component.container.querySelector('#author')
    fireEvent.change(authorInput, {
      target: { value: author }
    })

    const urlInput = component.container.querySelector('#url')
    fireEvent.change(urlInput, {
      target: { value: url }
    })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(title)
    expect(createBlog.mock.calls[0][0].author).toBe(author)
    expect(createBlog.mock.calls[0][0].url).toBe(url)
  })

})