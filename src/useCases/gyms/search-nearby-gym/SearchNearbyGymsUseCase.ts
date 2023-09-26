import { IGymsRepository } from "@/repositories/contracts/IGymsRepository";
import { Gym } from "@prisma/client";

interface SearchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface SearchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class SearchNearbyGymsUseCase {
  constructor(private gymsRespository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: SearchNearbyGymsUseCaseRequest): Promise<SearchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRespository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
