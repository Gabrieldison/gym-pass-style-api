import { FastifyInstance } from "fastify";
import { registerController } from "./users/RegisterController";
import { authenticateController } from "./users/AuthenticateController";
import { ProfileController } from "./users/ProfileController";
import { verifyJwt } from "../middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
  app.get("/me", { onRequest: [verifyJwt] }, ProfileController);
}
