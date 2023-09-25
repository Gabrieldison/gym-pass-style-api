import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../AuthenticateUseCase";

export function MakeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();

  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

  return authenticateUseCase;
}
