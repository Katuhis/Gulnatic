import IPatch from 'interfaces/IPatch'
import api from '../index'

const getPatches = (
  abortController: AbortController
): Promise<IPatch[]> => {
  return api
    .get('versions', {
      signal: abortController.signal
    })
    .then((response) => response.data.data.versions as IPatch[])
    .catch((e) => Promise.reject(e))
}

export default getPatches
