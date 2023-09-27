import { FastifyInstance } from "fastify";
import { registerController } from "./register/RegisterController";
import { authenticateController } from "./authenticate/AuthenticateController";
import { ProfileController } from "./get-user-profile/ProfileController";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { refreshTokenController } from "./authenticate/RefreshTokenController";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
  app.patch('/token/refresh', refreshTokenController)
  app.get("/me", { onRequest: [verifyJwt] }, ProfileController);
}
