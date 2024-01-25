import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { CreateConsultantUseCase } from "./create-consultant";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { InMemoryConsultantsRepository } from "@/repositories/in-memory/in-memory-consultants-repository";

let consultantsRepository: ConsultantsRepository;
let sut: CreateConsultantUseCase;

describe("Create Consultant Use Case", () => {
  beforeEach(() => {
    consultantsRepository = new InMemoryConsultantsRepository();
    sut = new CreateConsultantUseCase(consultantsRepository);
  });

  it("should be able to create consultant", async () => {
    const { consultant } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(consultant.id).toEqual(expect.any(String));
  });

  it("should reate a hash of the password", async () => {
    const { consultant } = await sut.execute({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      consultant.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
