import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/contracts/ICheckinRepository";

interface HistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface HistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class HistoryUseCase {
  constructor(private checkinsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: HistoryUseCaseRequest): Promise<HistoryUseCaseResponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns,
    };
  }
}
