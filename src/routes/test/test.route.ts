import { z } from "zod";
import { createQueryValidatedRoute } from "@utils/routes/createRouteGet";
import { Container } from "typedi";
import { TestServiceToken } from "../../services/test.service";
import { testResponseSchema } from "./test.schemas";

const testRoute = createQueryValidatedRoute({
  path: "/test",
  handler: async (c) => {
    const testService = Container.get(TestServiceToken);
    const data = await testService.getTestData();
    return c.json(data);
  },
  options: {
    responses: {
      200: {
        description: "Returns a list of test data",
        schema: testResponseSchema,
      },
    },
  },
});

export default testRoute;
