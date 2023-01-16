interface IRoutes {
  [key: string]: string
}

const routes: IRoutes = {
  home: '/',
  init: '/init',
  patches: '/patches/*',
  patch: '/patches/:patchId',
  champions: '/patches/:patchId/champions/*',
  champion: '/patches/:patchId/champions/:championId'
}

export const getPatchLink = (patchId?: string): string => {
  return routes.patch.replace(':patchId', patchId || '')
}

export default routes
