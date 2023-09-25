import { describe, expect, it } from "vitest";
import { beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./CreateGymUseCase";
import { randomUUID } from "crypto";

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(inMemoryGymsRepository);
  });
  it("should be able to register", async () => {
    const { gym } = await sut.execute({
      id: randomUUID(),
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
