import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";

const registerRoutes = (app: OpenAPIHono, routes: any[]) => {
  routes.forEach(({ route, handler }) => {
    app.openapi(route, handler);
  });

  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Todo nodejs server",
    },
  });

  app.get("/ui", swaggerUI({ url: "/doc" }));
};

export default registerRoutes;
