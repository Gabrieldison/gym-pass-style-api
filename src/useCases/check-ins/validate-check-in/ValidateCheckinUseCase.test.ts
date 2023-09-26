import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ValidateCheckinUseCase } from "./ValidateCheckinUseCase";
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-erros";

let validateCheckinsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckinUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(async () => {
    validateCheckinsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckinUseCase(validateCheckinsRepository);

    // vi.useFakeTimers();
  });

  afterEach(() => {
    //  vi.useRealTimers();
  });

  it("should be able to validate  check-in", async () => {
    const createdCheckIn = await validateCheckinsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(validateCheckinsRepository.items[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({ checkInId: "inexistent-checkin-in-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
