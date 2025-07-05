import type { Context as HonoContext } from "hono";

export type Env = {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  SUPABASE_SERVICE_KEY: string;
};

export interface AppContext extends HonoContext {
  env: Env;
}
