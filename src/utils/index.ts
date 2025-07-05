import registerRoutes from "./registerRoutes";
import { ValidateRequestBody } from "./validateBody";
import { createBodyValidatedRoute } from "./routes/createRoute";
import { createQueryValidatedRoute } from "./routes/createRouteGet";

export { registerRoutes, ValidateRequestBody, createBodyValidatedRoute, createQueryValidatedRoute };
