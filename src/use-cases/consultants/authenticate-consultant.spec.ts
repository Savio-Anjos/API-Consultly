import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { AuthenticateConsultantUseCase } from "./authenticate-consultant";
import { InMemoryConsultantsRepository } from "@/repositories/in-memory/in-memory-consultants-repository";

let consultantRepository: ConsultantsRepository;
let sut: AuthenticateConsultantUseCase;

describe("Authenticate Consultant Use Case", () => {
  beforeEach(() => {
    consultantRepository = new InMemoryConsultantsRepository();
    sut = new AuthenticateConsultantUseCase(consultantRepository);
  });

  it("should be able to authenticate consultant", async () => {
    await consultantRepository.create({
      name: "John Doe",
      email: "johndoe@ecample.com",
      password_hash: await hash("123456", 6),
    });

    const { consultant } = await sut.execute({
      email: "johndoe@ecample.com",
      password: "123456",
    });

    expect(consultant.id).toEqual(expect.any(String));
  });

  it("should not be possible to authenticate with a wrong non-existent email", async () => {
    await expect(
      sut.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await consultantRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(
      sut.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
