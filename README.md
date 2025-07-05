# Servisometrs Node

A Node.js backend service built with Hono, TypeScript, and Supabase.

## Prerequisites

- Node.js (v18 or higher recommended)
- [pnpm](https://pnpm.io/installation) package manager
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for local development)

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up Supabase locally:
   - Follow the [Supabase Local Development](https://supabase.com/docs/guides/cli/local-development) guide to set up your local Supabase instance
   - Start Supabase locally:
   ```bash
   supabase start
   ```

3. Start the development server:
```bash
pnpm dev
```

The server will start at `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start the development server with hot reload
- `pnpm build` - Build the TypeScript project
- `pnpm start` - Start the production server

## Project Structure

```
src/
  ├── clients/         # External client configurations (e.g., Supabase)
  ├── routes/          # API route definitions
  ├── types/          # TypeScript type definitions
  ├── utils/          # Utility functions
  └── server.ts       # Main server configuration
```

## API Documentation

Once the server is running, you can access the Swagger UI documentation at:
`http://localhost:3000/ui`

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
