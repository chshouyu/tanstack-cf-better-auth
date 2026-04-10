import { createRouter as createTanStackRouter } from '@tanstack/react-router'

import { routeTree } from '@/routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    scrollRestoration: true,
    defaultPreload: false,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    defaultErrorComponent: ({ error }) => (
      <div>
        <h1>Error</h1>
        <pre>{String(error)}</pre>
      </div>
    ),
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
