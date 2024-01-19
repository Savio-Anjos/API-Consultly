import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { InMemoryConsultantsRepository } from "@/repositories/in-memory/in-memory-consultants-repository";
import { AvailabilityRepository } from "@/repositories/availability-repository";
import { InMemoryAvailabilityRepository } from "@/repositories/in-memory/in-memory-availability-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { CreateAvailabilityUseCase } from "./create-availability";

let consultantRepository: ConsultantsRepository;
let availabilityRepository: AvailabilityRepository;
let sut: CreateAvailabilityUseCase;

describe("Create availability Use Case", () => {
  beforeEach(() => {
    consultantRepository = new InMemoryConsultantsRepository();
    availabilityRepository = new InMemoryAvailabilityRepository();
    sut = new CreateAvailabilityUseCase(
      consultantRepository,
      availabilityRepository
    );
  });

  it("should be able to create availability", async () => {
    const consultant = await consultantRepository.create({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { availability } = await sut.execute({
      day: "25",
      startTime: "18:00",
      endTime: "19:00",
      consultantId: consultant.id,
    });

    expect(availability.id).toEqual(expect.any(String));
  });

  it("should not be possible to create availability for a non-existent consultant", async () => {
    await expect(() =>
      sut.execute({
        day: "25",
        startTime: "18:00",
        endTime: "19:00",
        consultantId: "non-existent id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
