import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (object) => {
  const headers = {
    'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  }
  const request = await axios.post(baseUrl, object, { headers })
  return request.data
}

const update = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object)
  return request.data
}

const comment = async (object) => {
  const request = await axios.post(`${baseUrl}/${object.id}/comments`, object)
  return request.data
}

const remove = async (id) => {
  const headers = {
    'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  }
  await axios.delete(`${baseUrl}/${id}`, { headers })
}

export default { getAll, create, update, comment, remove }