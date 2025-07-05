import { createClient } from "@supabase/supabase-js";
import type { Env } from "../types/index.js";

export default class SupabaseClient {
  private client;

  constructor(env: Env) {
    this.client = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
  }
}
