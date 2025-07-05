import type { Context as HonoContext } from "hono";
import SupabaseService from "@services/supabase.client.js";

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
}

interface Clients {
  supabase: SupabaseService;
}

export interface AppContext extends HonoContext {
  env: { clients: Clients };
}
