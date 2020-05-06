import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const upvote = async (id) => {
  const oldResponse = await axios.get(`${baseUrl}/${id}`)
  const object = oldResponse.data
  const response = await axios.put(`${baseUrl}/${id}`, {...object, votes: object.votes + 1})
  return response.data
}

export default { getAll, createNew, upvote }