import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api.thecoffeehouse.com/',
})

export const GET = async (path, params) => {
  const response = await request.get(path, params)
  return response.data
}

export const POST = async (path, data) => {
  const response = await request.post(path, data)
  return response
}

export const PUT = async (path, id, data) => {
  const response = await request.put(path, id, data)
  return response
}

export const DELETE = async (path, id) => {
  const response = await request.delete(path, id)
  return response
}

export default request
