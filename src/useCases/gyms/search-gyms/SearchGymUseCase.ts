import { Gym } from "@prisma/client";
import { IGymsRepository } from "@/repositories/contracts/IGymsRepository";

interface SearchGymRequest {
  query: string;
  page: number;
}

interface SearchGymResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({ query, page }: SearchGymRequest): Promise<SearchGymResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}
