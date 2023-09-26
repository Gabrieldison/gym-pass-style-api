import { makeGetUserProfileUseCase } from "@/useCases/users/get-user-profile/factory/make-get-user-profile-use.case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function ProfileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  return reply.status(201).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
