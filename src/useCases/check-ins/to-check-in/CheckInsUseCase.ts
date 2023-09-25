import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/contracts/ICheckinRepository";
import { IGymsRepository } from "@/repositories/contracts/IGymsRepository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { ResourceNotFoundError } from "@/errors/resource-not-found-erros";
import { MaxDistanceError } from "@/errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "@/errors/max-number-of-check-ins-error";

interface CheckinUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInsUseCase {
  constructor(
    private checkinsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkinsRepository.findByUsersIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
