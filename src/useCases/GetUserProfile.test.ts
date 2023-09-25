import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { GetUserProfileUseCase } from "./GetUserProfileUseCase";
import { ResourceNotFoundError } from "./errors/resource-not-found-erros";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get user profile use ", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: "John doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  //////////////////

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
