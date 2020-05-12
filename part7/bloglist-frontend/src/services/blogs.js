import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('In addComment:')
  console.log(id)
  console.log(comment)
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment: comment }, config)
  console.log(response)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, get, create, update, remove, addComment }