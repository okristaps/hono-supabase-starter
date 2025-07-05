import { OpenAPIHono } from "@hono/zod-openapi";
import { registerRoutes } from "@utils";
import { routes } from "@routes";
import type { Env } from "hono";

const app = new OpenAPIHono<Env>();

registerRoutes(app, routes);

export default app;
