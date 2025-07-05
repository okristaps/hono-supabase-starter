import { z } from "@hono/zod-openapi";

export type ParamsType = z.infer<typeof ParamsSchema>;

export const ParamsSchema = z.object({
  id: z.string(),
});

export const ParamsSchemaNumber = z.object({
  id: z.number(),
});

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(0, "Age must be a positive number"),
});

export const UserQuerySchema = z.object({
  age: z.string().optional(),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
});

export const UpdateUserSchema = z.object({
  name: z.string(),
  age: z.string(),
});
