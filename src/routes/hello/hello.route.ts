import type { AppContext } from "@types";
import { createQueryValidatedRoute } from "@utils/routes/createRouteGet";
import { ParamsSchema, UserQuerySchema, UserSchema } from "./hello.schemas";

const getUserRoute = createQueryValidatedRoute({
  path: "/v1/users/{id}",
  querySchema: UserQuerySchema,
  paramsSchema: ParamsSchema,
  handler: async (c: AppContext, validatedParams, validatedQuery) => {
    const { id } = validatedParams;
    const { age } = validatedQuery;

    const users = [
      { id: "1", name: "John Doe", age: 30 },
      { id: "2", name: "Jane Doe", age: 25 },
    ];

    let user = users.find((u) => u.id === id);

    if (user && age && user.age !== parseInt(age)) {
      return c.json({ error: "No user found matching the given age" }, 404);
    }

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user }, 200);
  },
  options: {
    description: "Retrieve a user by ID with optional age filtering",
    summary: "Fetch a user by ID, optionally filter by age",
    tags: ["Users"],
    responses: {
      200: {
        description: "User retrieved successfully",
        schema: UserSchema,
      },
      404: {
        description: "User not found",
        schema: UserSchema,
      },
    },
  },
});

export default getUserRoute;
