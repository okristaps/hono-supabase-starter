import { createBodyValidatedRoute } from "@utils/routes/createRoute";
import { ParamsSchema, UpdateUserSchema } from "./hello.schemas";

const updateUserRoute = createBodyValidatedRoute({
  method: "put",
  path: "/users/{id}",
  bodySchema: UpdateUserSchema,
  paramsSchema: ParamsSchema,
  handler: async (c, body) => {
    const updatedUser = {
      id: c.req.param("id"),
      name: body.name || "No name provided",
      age: body.age || 0,
    };
    return c.json(updatedUser, 200);
  },
  options: {
    description: "Update an existing user",
    summary: "Updates a user's name and/or age by ID",
    tags: ["Users"],
    responses: {
      200: {
        description: "User updated successfully",
        schema: UpdateUserSchema,
      },
      404: {
        description: "User not found",
        schema: UpdateUserSchema,
      },
    },
  },
});

export default updateUserRoute;
