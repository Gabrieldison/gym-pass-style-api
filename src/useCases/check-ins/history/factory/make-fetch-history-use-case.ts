import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { HistoryUseCase } from "../HistoryUseCase";

export function makeFetchInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new HistoryUseCase(checkInsRepository);

  return useCase;
}
