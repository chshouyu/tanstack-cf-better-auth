# tanstack-cf-better-auth

A minimal example of running better-auth with TanStack Start on Cloudflare Workers.

This project demonstrates a simple auth flow with:

- Email and password sign up
- Email and password sign in
- Session handling with better-auth
- Sign out
- Cloudflare D1 for persistence

## Stack

- TanStack Start
- TanStack Router
- better-auth
- Cloudflare Workers
- Cloudflare D1
- React 19
- Tailwind CSS 4

## Project Structure

```txt
src/
	routes/
		index.tsx              # Home page with session state
		sign-in.tsx            # Sign-in page
		sign-up.tsx            # Sign-up page
		api/auth/$.ts          # better-auth HTTP handler
	server/
		better-auth.server.ts  # better-auth server setup
	utils/
		auth-client.ts         # better-auth client setup
migrations/
	0001_init.sql            # Initial D1 schema
wrangler.jsonc             # Cloudflare Workers and D1 config
```

## Local Development

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure D1

Create your own D1 database and update `wrangler.jsonc` with the correct values:

- `database_name`
- `database_id`
- `binding` which is `MY_DB` in this project

### 3. Apply migrations

```bash
pnpm db:mig:apply
```

This applies `migrations/0001_init.sql` to D1 and creates the base tables required by better-auth:

- `User`
- `Session`
- `Account`
- `Verification`

### 4. Start the dev server

```bash
pnpm dev
```

The app runs on `http://localhost:3000` by default.

## How Auth Is Wired

- `src/server/better-auth.server.ts` initializes better-auth and connects it to Cloudflare D1.
- `src/routes/api/auth/$.ts` exposes the better-auth GET and POST handler.
- `src/utils/auth-client.ts` creates the client-side auth instance.
- The home page reads the current session with `authClient.useSession()`.
- The sign-in and sign-up pages use `authClient.signIn.email()` and `authClient.signUp.email()`.

## Build and Deploy

### Build

```bash
pnpm build
```

### Deploy to Cloudflare

```bash
pnpm deploy
```

The deploy command builds the app first and then publishes it with `wrangler deploy`.

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm deploy
pnpm cf-types
pnpm db:mig:apply
```

## Use Cases

This project is a good starting point if you want to:

- Validate a better-auth setup on Cloudflare Workers
- See how better-auth is mounted inside a TanStack Start app
- Start from a minimal D1-backed email/password auth example
