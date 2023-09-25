import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../contracts/IUsersRepository";

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  findById(
    id: string
  ): Promise<{
    id: string;
    name: string;
    email: string;
    password_hash: string;
    created_at: Date;
  } | null> {
    throw new Error("Method not implemented.");
  }
}
