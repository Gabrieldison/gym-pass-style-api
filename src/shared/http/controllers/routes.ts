import { FastifyInstance } from "fastify";
import { registerController } from "./users/RegisterController";
import { authenticateController } from "./users/AuthenticateController";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
}
