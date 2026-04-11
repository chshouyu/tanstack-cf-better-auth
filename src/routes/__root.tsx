import { TanStackDevtools } from '@tanstack/react-devtools'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { auth } from '@/server/better-auth.server'

import appCss from '../styles.css?url'

function toDebugErrorPayload(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    }
  }

  return {
    message: String(error),
  }
}

export const getSessionFn = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()

  const session = await auth.api.getSession({ headers })

  return session
})

export const Route = createRootRoute({
  beforeLoad: async () => {
    try {
      const session = await getSessionFn()

      return {
        session,
        sessionDebug: {
          ok: true,
          fetchedAt: new Date().toISOString(),
          hasSession: Boolean(session),
        },
        sessionContent: session ? session.toString() : null,
      }
    } catch (error) {
      // Keep the app usable when session bootstrap fails.
      console.error('Failed to load session in root beforeLoad:', error)
      return {
        session: null,
        sessionDebug: {
          ok: false,
          fetchedAt: new Date().toISOString(),
          error: toDebugErrorPayload(error),
        },
        sessionContent: null,
      }
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
