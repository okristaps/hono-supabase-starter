import { Service, Token, Container } from "typedi";
import { SupabaseClientToken } from "../clients/supabase.client";
import type { SupabaseClient } from "@supabase/supabase-js";

export const TestServiceToken = new Token<TestService>("TestService");

@Service({ id: TestServiceToken })
export class TestService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = Container.get(SupabaseClientToken);
  }

  async getTestData() {
    const { data, error } = await this.supabaseClient.from("test").select("*");

    if (error) {
      console.error("Error fetching test data:", error);
      throw new Error("Could not fetch test data");
    }

    return data;
  }
}
