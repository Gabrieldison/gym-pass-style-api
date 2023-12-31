import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../RegisterUseCase";

export function MakeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();

  const registerUseCase = new RegisterUseCase(prismaUsersRepository);

  return registerUseCase;
}
