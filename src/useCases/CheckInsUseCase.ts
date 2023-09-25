import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/contracts/ICheckinRepository";

interface CheckinUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInsUseCase {
  constructor(private checkinsRepository: ICheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
