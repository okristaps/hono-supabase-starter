# Servisometrs Node

A backend service built with [Hono](https://hono.dev/) and designed to run on the [Cloudflare Workers](https://workers.cloudflare.com/) platform. It uses TypeScript, Supabase for the database, and `typedi` for dependency injection.

## Prerequisites

- Node.js (v20 or higher recommended)
- [pnpm](https://pnpm.io/installation) package manager
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## Local Development Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set up Supabase
This project requires a local Supabase instance for database and authentication services.

- **Start Supabase locally:**
  ```bash
  supabase start
  ```
  This will spin up the local Supabase stack and provide you with local credentials. Keep this running in a separate terminal.

- **Apply Migrations:**
  To set up your database schema, apply the migrations.
  ```bash
  supabase db reset
  ```
  This command resets the local database and applies all migrations from the `supabase/migrations` folder.

### 3. Configure Environment Variables
The project uses [Cloudflare Wrangler](https://developers.cloudflare.com/workers/wrangler/), which loads local environment variables from a `.dev.vars` file.

- **Create the file:**
  Create a file named `.dev.vars` in the root of the project.

- **Add your credentials:**
  Copy the local credentials from the `supabase start` output into your `.dev.vars` file. You will need the **URL** and the **service_role key**.

  ```ini
  # .dev.vars
  SUPABASE_URL="your_local_supabase_url"
  SUPABASE_SERVICE_KEY="your_supabase_service_role_key"
  ```

  > **Note:** The `service_role` key is required for the backend to bypass Row Level Security (RLS) policies.

### 4. Start the Development Server
This project uses Wrangler to simulate the Cloudflare environment locally.

```bash
pnpm run dev
```
Wrangler will start the development server, typically on `http://localhost:8787`.

## API Documentation

Once the server is running, you can access the Swagger UI documentation at:
`http://localhost:8787/ui`

## Available Scripts

- `pnpm dev`: Starts the local development server with hot-reloading using Wrangler.
- `pnpm build`: Builds the project.
- `pnpm start`: Starts the production build.

## Project Structure

```
src/
  ├── clients/         # External client configurations (e.g., Supabase)
  ├── routes/          # API route definitions
  ├── types/          # TypeScript type definitions
  ├── utils/          # Utility functions
  └── server.ts       # Main server configuration
```

## Supabase

This project uses Supabase as the backend database and authentication provider. For local development:

1. Install Supabase CLI: https://supabase.com/docs/guides/cli
2. Initialize Supabase: `supabase init`
3. Start local Supabase: `supabase start`
4. Stop local Supabase: `supabase stop`

For more information about Supabase local development, visit:
https://supabase.com/docs/guides/cli/local-development

```
open http://localhost:3000
```
