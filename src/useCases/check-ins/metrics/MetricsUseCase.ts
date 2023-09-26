import { ICheckInsRepository } from "@/repositories/contracts/ICheckinRepository";

interface MetricsUseCaseRequest {
  userId: string;
}

interface MetricsUseCaseResponse {
  checkInsCount: number;
}

export class MetricsUseCase {
  constructor(private checkinsRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: MetricsUseCaseRequest): Promise<MetricsUseCaseResponse> {
    const checkInsCount = await this.checkinsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
