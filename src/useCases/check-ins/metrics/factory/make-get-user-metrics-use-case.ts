import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { MetricsUseCase } from "../MetricsUseCase";

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new MetricsUseCase(checkInsRepository);

  return useCase;
}
