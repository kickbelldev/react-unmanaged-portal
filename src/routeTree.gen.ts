import { Route as rootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as VideoIdRoute } from './routes/video.$id'

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexRoute
      parentRoute: typeof rootRoute
    }
    '/video/$id': {
      preLoaderRoute: typeof VideoIdRoute
      parentRoute: typeof rootRoute
    }
  }
}

const IndexRouteWithParent = IndexRoute.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as never)

const VideoIdRouteWithParent = VideoIdRoute.update({
  path: '/video/$id',
  getParentRoute: () => rootRoute,
} as never)

export const routeTree = rootRoute.addChildren([
  IndexRouteWithParent,
  VideoIdRouteWithParent,
])
