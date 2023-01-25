import { useEffect, useRef, useMemo } from 'react'
import endpoints from 'common/api/endpoints'

type EndpointNames = keyof typeof endpoints
type EndpointFunctions = typeof endpoints[EndpointNames]

type WithoutAbortController<F extends EndpointFunctions> = F extends (
  controller: AbortController,
  ...args: infer U
) => ReturnType<F>
  ? U
  : never

type HookEndpoints = {
  [Property in EndpointNames]: (
    ...args: WithoutAbortController<typeof endpoints[Property]>
  ) => ReturnType<typeof endpoints[Property]>
}

export default (): HookEndpoints => {
  const mountedRef = useRef(false)
  const activeRequests = useRef(new Map<string, AbortController>())

  useEffect(() => {
    const requests = activeRequests.current

    mountedRef.current = true

    return () => {
      mountedRef.current = false

      for (const abortController of requests.values()) {
        abortController.abort()
      }

      requests.clear()
    }
  }, [])

  return useMemo(() => {
    return Object.keys(endpoints).reduce((result, endpointKey) => {
      const endpoint = endpoints[endpointKey]

      result[endpointKey] = (...args) => {
        const requests = activeRequests.current

        requests.get(endpointKey)?.abort()

        const abortController = new AbortController()

        requests.set(endpointKey, abortController)

        return endpoint(abortController, ...args as [unknown])
          .then((response) => {
            const mounted = mountedRef.current

            if (mounted) {
              return response
            }

            return Promise.reject()
          })
      }

      return result
    }, {} as HookEndpoints)
  }, [])
}
