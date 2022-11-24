import IUser from 'interfaces/IUser'
import api from '../index'

const getUser = (
  abortController: AbortController
): Promise<IUser> => {
  return api
    .get('get-user', {
      signal: abortController.signal
    })
    .then((response) => response.data as IUser)
    .catch((e) => Promise.reject(e))
}

export default getUser
