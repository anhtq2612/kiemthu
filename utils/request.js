import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api.thecoffeehouse.com/',
})

export const GET = async (path, params) => {
  const response = await request.get(path, params)
  return response.data
}

export default request
