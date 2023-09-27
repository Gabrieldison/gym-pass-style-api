import { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";
import { registerController } from "./users/register/RegisterController";
import { authenticateController } from "./users/authenticate/AuthenticateController";
import { ProfileController } from "./users/get-user-profile/ProfileController";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
  app.get("/me", { onRequest: [verifyJwt] }, ProfileController);
}
