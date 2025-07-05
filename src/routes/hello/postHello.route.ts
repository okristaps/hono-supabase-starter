import { createBodyValidatedRoute } from "@utils/routes/createRoute";
import { CreateUserSchema, UserSchema } from "./hello.schemas";

const createUserRoute = createBodyValidatedRoute({
  method: "post",
  path: "/users",
  bodySchema: CreateUserSchema,
  handler: async (c, body) => {
    const newUser = {
      id: Math.random().toString(36).substring(7),
      name: body.name,
      age: body.age,
    };
    return c.json(newUser, 201);
  },
  options: {
    description: "Create a new user",
    summary: "Creates a user with name and age",
    tags: ["Users"],
    responses: {
      201: {
        description: "User created successfully",
        schema: UserSchema,
      },
    },
  },
  middlewares: [], // add middlewares here
});

export default createUserRoute;
