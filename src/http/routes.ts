import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/users/RegisterController";
import { authenticateController } from "./controllers/users/AuthenticateController";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
}
