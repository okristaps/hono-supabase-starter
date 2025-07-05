import { z } from "zod";

export const testResponseSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    status: z.string(),
    count: z.number(),
    is_active: z.boolean(),
    metadata: z.record(z.unknown()),
  })
);
