import "reflect-metadata";
import { Container } from "typedi";
import app from "./server";
import { SupabaseClientToken } from "./clients/supabase.client";
import { createClient } from "@supabase/supabase-js";
import type { Env } from "@types";
import type { ExecutionContext } from "hono";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
    Container.set(SupabaseClientToken, supabaseClient);

    return app.fetch(request, env, ctx);
  },

  // async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
  //   console.log("Cron job processed");
  // },
};
