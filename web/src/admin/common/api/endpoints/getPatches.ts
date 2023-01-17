import IPatch from 'interfaces/IPatch'
import api from '../index'

const getPatches = (
  abortController: AbortController
): Promise<IPatch[]> => {
  return api
    .get('patches', {
      signal: abortController.signal
    })
    .then((response) => response.data as IPatch[])
    .catch((e) => Promise.reject(e))
}

export default getPatches
