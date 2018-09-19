import axios from 'axios'
import { SERVER_URL } from '../../config'

export const restAPI = axios.create({
  baseURL: `${SERVER_URL}`,
})
