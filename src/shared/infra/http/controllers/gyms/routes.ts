import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { seacrhNearbyGymsController } from "./search-neaby-gyms/SearchNearbyController";
import { createGymsController } from "./create-gym/CreateGymsController";
import { searchGymsController } from "./search-gyms/SearchGymsController";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby', seacrhNearbyGymsController)

  app.post('/gyms', createGymsController)
}
