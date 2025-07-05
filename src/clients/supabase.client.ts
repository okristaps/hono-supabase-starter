import { Token } from "typedi";
import type { SupabaseClient } from "@supabase/supabase-js";

export const SupabaseClientToken = new Token<SupabaseClient>("SupabaseClient");
