import { authClient } from '@/utils/auth-client'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { SubmitEvent, useState } from 'react'

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await authClient.signIn.email({
      email,
      password,
    })

    if (error) {
      setMessage(error.message || 'Sign in failed, please try again.')
      setLoading(false)
      return
    }

    setLoading(false)

    await router.navigate({ to: '/' })
  }

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <form className="w-full max-w-sm space-y-3" onSubmit={handleSubmit}>
        <h1 className="text-xl font-semibold">Sign In</h1>

        <input
          className="w-full rounded border px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full rounded border px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Sign In'}
        </button>

        {message ? <p className="text-sm">{message}</p> : null}

        <div>
          <Link to="/sign-up" className="text-sm text-blue-500">
            Don't have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  )
}
