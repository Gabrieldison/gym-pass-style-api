import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchNearbyGymsUseCase } from "./SearchNearbyGymsUseCase";

let searchGymsNearbyRepository: InMemoryGymsRepository;
let sut: SearchNearbyGymsUseCase;

describe("User check in history useCase", () => {
  beforeEach(async () => {
    searchGymsNearbyRepository = new InMemoryGymsRepository();
    sut = new SearchNearbyGymsUseCase(searchGymsNearbyRepository);
  });

  it("should be able to search for nearby gyms", async () => {
    await searchGymsNearbyRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await searchGymsNearbyRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
