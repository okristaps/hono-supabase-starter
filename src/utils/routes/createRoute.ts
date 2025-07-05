import { createRoute } from "@hono/zod-openapi";
import { ZodSchema, ZodObject, ZodError } from "zod";

import type { AppContext } from "@types";
import { ValidateRequestBody } from "@utils";

type Method = "post" | "put" | "delete";
type HandlerFn<T> = (c: AppContext, body: T) => Promise<any>;
type Middleware = (c: AppContext, next: () => Promise<void>) => Promise<void>;
interface RouteOptions<T> {
  description?: string;
  summary?: string;
  tags?: string[];
  responses?: Record<number, { description: string; schema: ZodSchema<any> }>;
}

interface CreateBodyValidatedRouteOptions<T> {
  method: Method;
  path: string;
  bodySchema: ZodSchema<T>;
  paramsSchema?: ZodObject<any>;
  handler: HandlerFn<T>;
  options?: RouteOptions<T>;
  middlewares?: Middleware[];
}

export function createBodyValidatedRoute<T>({
  method,
  path,
  bodySchema,
  paramsSchema,
  handler,
  options = {},
  middlewares = [],
}: CreateBodyValidatedRouteOptions<T>) {
  const { description, summary, tags } = options;

  const defaultResponse = {
    content: {
      "application/json": {
        schema: bodySchema,
      },
    },
    description: `${method.toUpperCase()} request was successful`,
  };

  const allResponses = {
    200: defaultResponse,
    400: {
      description: "Invalid request body",
      schema: bodySchema,
    },
    ...(options?.responses || {}),
  };

  return {
    route: createRoute({
      middleware: middlewares,
      method,
      path,
      request: {
        body: {
          content: {
            "application/json": {
              schema: bodySchema,
            },
          },
        },
        params: paramsSchema ? paramsSchema : undefined,
      },
      responses: allResponses,
      description,
      summary,
      tags,
    }),
    handler: async (c: AppContext) => {
      if (paramsSchema) {
        try {
          const params = c.req.param();
          console.log("Params:", params);
          paramsSchema.parse(params);
        } catch (e: any) {
          if (e instanceof ZodError || e?.constructor.name === "ZodError") {
            return c.json({ error: "Invalid path parameters", details: (e as ZodError).errors }, 400);
          }
          return c.json({ error: "Unexpected error", details: (e as Error).message }, 500);
        }
      }

      try {
        const body = await ValidateRequestBody(c, bodySchema);

        return handler(c, body);
      } catch (e: any) {
        if (e instanceof ZodError || e?.constructor.name === "ZodError") {
          const formattedErrors = (e as ZodError).errors.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          }));

          return c.json(
            {
              error: "Invalid request body",
              details: formattedErrors,
            },
            400
          );
        }

        return c.json({ error: "Unexpected error", details: (e as Error).message }, 500);
      }
    },
  };
}
