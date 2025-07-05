import { createRoute } from "@hono/zod-openapi";
import type { ZodSchema } from "zod";
import type { AppContext } from "@types";
import type { MiddlewareHandler } from "hono";

type HandlerFn<Params, Query> = (c: AppContext, validatedParams: Params, validatedQuery: Query) => Promise<any>;
type Middleware = (c: AppContext, next: () => Promise<void>) => Promise<void>;
interface RouteOptions<Params, Query> {
  description?: string;
  summary?: string;
  tags?: string[];
  responses?: Record<number, { description: string; schema: ZodSchema<any> }>;
}

interface CreateQueryValidatedRouteOptions<Params, Query> {
  path: string;
  paramsSchema?: ZodSchema<Params>;
  querySchema?: ZodSchema<Query>;
  handler: HandlerFn<Params, Query>;
  options?: RouteOptions<Params, Query>;
  middlewares?: Middleware[] | MiddlewareHandler[];
}

export function createQueryValidatedRoute<Params, Query>({
  path,
  paramsSchema,
  querySchema,
  middlewares,
  handler,
  options = {},
}: CreateQueryValidatedRouteOptions<Params, Query>) {
  const { description, summary, tags, responses } = options;

  const responseSchema = querySchema || paramsSchema;

  const defaultResponse = responseSchema
    ? {
        content: {
          "application/json": {
            schema: responseSchema,
          },
        },
        description: "GET request was successful",
      }
    : undefined;

  const allResponses = {
    ...(defaultResponse ? { 200: defaultResponse } : {}),
    ...(responses || {}),
  };

  return {
    route: createRoute({
      method: "get",
      path,
      middleware: middlewares,
      request: {
        params: (paramsSchema as any) ?? undefined,
        query: (querySchema as any) ?? undefined,
      },
      responses: allResponses,
      description,
      summary,
      tags,
    }),
    handler: async (c: AppContext) => {
      try {
        let validatedQuery: Query | undefined;
        if (querySchema) {
          validatedQuery = querySchema.parse(c.req.query());
        }

        let validatedParams: Params | undefined;
        if (paramsSchema) {
          validatedParams = paramsSchema.parse(c.req.param());
        }

        return handler(c, validatedParams as Params, validatedQuery as Query);
      } catch (e) {
        if (e instanceof Error && "errors" in e) {
          return c.json({ error: "Invalid parameters", details: (e as any).errors }, 400);
        }
        return c.json({ error: "Unexpected error occurred" }, 500);
      }
    },
  };
}
