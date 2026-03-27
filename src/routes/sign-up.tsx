import { authClient } from '@/utils/auth-client'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { SubmitEvent, useState } from 'react'

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await authClient.signUp.email({
      email,
      name,
      password,
    })

    if (error) {
      setMessage(error.message || 'Sign up failed, please try again.')
      setLoading(false)
      return
    }

    setLoading(false)

    await router.navigate({ to: '/' })
  }

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <form className="w-full max-w-sm space-y-3" onSubmit={handleSubmit}>
        <h1 className="text-xl font-semibold">Sign Up</h1>

        <input
          className="w-full rounded border px-3 py-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          {loading ? 'Submitting...' : 'Sign Up'}
        </button>

        {message ? <p className="text-sm">{message}</p> : null}

        <div className="flex justify-between">
          <Link to="/sign-in" className="text-sm text-blue-500">
            Already have an account? Sign In
          </Link>
          <Link to="/" className="text-sm text-blue-500">
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  )
}
