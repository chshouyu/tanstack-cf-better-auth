import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="h-screen flex-col flex justify-center items-center space-y-3">
      <h1 className="text-3xl font-bold">Hello!</h1>
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
    </main>
  )
}
