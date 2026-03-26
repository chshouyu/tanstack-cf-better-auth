import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { db } from '@/db'
import { accountSchema, sessionsSchema, usersSchema, verificationSchema } from '@/schema'

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      user: usersSchema,
      session: sessionsSchema,
      account: accountSchema,
      verification: verificationSchema,
    },
  }),
  plugins: [tanstackStartCookies()],
})
