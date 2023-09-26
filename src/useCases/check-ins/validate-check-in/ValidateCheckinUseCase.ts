import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/contracts/ICheckinRepository";
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-erros";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "@/shared/errors/late-check-in-validations-error";

interface ValidateCheckinUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckinUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckinUseCase {
  constructor(private checkinsRepository: ICheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
    const checkIn = await this.checkinsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkinsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
