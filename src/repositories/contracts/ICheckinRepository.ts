import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUsersIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}
