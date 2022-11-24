import axios from 'axios'
import { API_URL } from 'common/constants'

export default axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: 'Some auth token'
  }
})
