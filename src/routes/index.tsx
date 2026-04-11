import { Fragment } from 'react'

import { createFileRoute, Link, useRouter } from '@tanstack/react-router'

import { authClient } from '@/utils/auth-client'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const router = useRouter()

  const { session } = Route.useRouteContext()

  const name = session?.user?.name

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center space-y-3">
      <h1 className="text-3xl font-bold">
        {name ? `Welcome back, ${name}!` : 'Welcome to the app!'}
      </h1>
      <div>
        <Link to="/" className="text-blue-500">
          Go to home
        </Link>
      </div>
      {name ? (
        <div>
          <button
            className="cursor-pointer"
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: async () => {
                    await router.invalidate()
                  },
                },
              })
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <Fragment>
          <div>
            <Link className="text-blue-500" to="/sign-in">
              Go to sign in
            </Link>
          </div>
          <div>
            <Link className="text-blue-500" to="/sign-up">
              Go to sign up
            </Link>
          </div>
        </Fragment>
      )}
    </main>
  )
}
