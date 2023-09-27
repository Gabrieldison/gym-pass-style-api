import { FastifyInstance } from "fastify";
import { registerController } from "./register/RegisterController";
import { authenticateController } from "./authenticate/AuthenticateController";
import { ProfileController } from "./get-user-profile/ProfileController";
import { verifyJwt } from "../../middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
  app.get("/me", { onRequest: [verifyJwt] }, ProfileController);
}
