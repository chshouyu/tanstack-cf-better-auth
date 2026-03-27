# tanstack-cf-better-auth

A minimal example of running better-auth with TanStack Start on Nitro.

This project demonstrates a simple auth flow with:

- Email and password sign up
- Email and password sign in
- Session handling with better-auth
- Sign out
- SQLite-based persistence through Drizzle and better-sqlite3

## Stack

- TanStack Start
- TanStack Router
- better-auth
- Nitro
- Drizzle ORM
- better-sqlite3
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
	db.ts                    # Drizzle SQLite database instance
	schema.ts                # Auth-related database schema
	server/
		better-auth.server.ts  # better-auth server setup
	utils/
		auth-client.ts         # better-auth client setup
migrations/
	0001_init.sql            # Initial SQLite schema
.env                       # Local environment variables
```

## Local Development

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env` file with the following values:

```bash
BETTER_AUTH_URL=http://localhost:3000
DB_FILE_NAME=local.db
```

- `BETTER_AUTH_URL` is used by better-auth.
- `DB_FILE_NAME` points to the SQLite database file used by Drizzle and better-sqlite3.

### 3. Prepare the database

The initial schema is defined in `migrations/0001_init.sql`.

If you are starting from scratch, create a SQLite database file and apply the schema with a tool such as `sqlite3`:

```bash
sqlite3 local.db < migrations/0001_init.sql
```

This creates the base tables required by better-auth:

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

- `src/server/better-auth.server.ts` initializes better-auth and uses the Drizzle adapter.
- `src/db.ts` creates a Drizzle database instance backed by `better-sqlite3`.
- `src/schema.ts` defines the Better Auth tables in SQLite.
- `src/routes/api/auth/$.ts` exposes the better-auth GET and POST handler.
- `src/utils/auth-client.ts` creates the client-side auth instance.
- The home page reads the current session with `authClient.useSession()`.
- The sign-in and sign-up pages use `authClient.signIn.email()` and `authClient.signUp.email()`.

## Build

```bash
pnpm build
```

You can also preview the production build locally:

```bash
pnpm preview
```

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm preview
```

## Use Cases

This project is a good starting point if you want to:

- Validate a better-auth setup on Nitro
- See how better-auth is mounted inside a TanStack Start app
- Start from a minimal SQLite-backed email/password auth example
