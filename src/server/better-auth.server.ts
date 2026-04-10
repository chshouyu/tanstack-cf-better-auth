import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { env } from 'cloudflare:workers'

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: env.MY_DB,
  plugins: [tanstackStartCookies()],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 30, // Cache duration in seconds
    },
  },
})
