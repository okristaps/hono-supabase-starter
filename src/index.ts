import { serve } from "@hono/node-server";
import app from "./server";
import SupabaseClient from "./clients/supabase.client";

import type { Env } from "@types";
import type { ExecutionContext } from "hono";

serve(
  {
    fetch: app.fetch,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const supabaseClient = new SupabaseClient({
      SUPABASE_URL: env.SUPABASE_URL,
      SUPABASE_KEY: env.SUPABASE_KEY,
    });

    const envWithServices = {
      ...env,
      clients: {
        supabase: supabaseClient,
      },
    };

    return app.fetch(request, envWithServices, ctx);
  },

  // async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
  //   console.log("Cron job processed");
  // },
};
