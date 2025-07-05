import { ZodSchema, ZodError } from "zod";
import type { Context } from "hono";

export async function ValidateRequestBody<T>(c: Context, schema: ZodSchema<T>): Promise<T> {
  try {
    const body = await c.req.json();
    return schema.parse(body);
  } catch (e: any) {
    if (e instanceof ZodError || e.constructor.name === "ZodError") {
      throw e;
    }
    throw new Error("Failed to parse request body");
  }
}
