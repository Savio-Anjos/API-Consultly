import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { AvailabilityRepository } from "@/repositories/availability-repository";
import { InMemoryAvailabilityRepository } from "@/repositories/in-memory/in-memory-availability-repository";
import { DeleteAvailabilityUseCase } from "./delete-availability";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { InMemoryConsultantsRepository } from "@/repositories/in-memory/in-memory-consultants-repository";

let availabilityRepository: AvailabilityRepository;
let consultantRepository: ConsultantsRepository;
let sut: DeleteAvailabilityUseCase;
describe("Delete availability Use Case", () => {
  beforeEach(() => {
    availabilityRepository = new InMemoryAvailabilityRepository();
    consultantRepository = new InMemoryConsultantsRepository();
    sut = new DeleteAvailabilityUseCase(availabilityRepository);
  });

  it("should be able to delete availability", async () => {
    const consultant = await consultantRepository.create({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { id } = await availabilityRepository.create({
      day: "25",
      startTime: "18:00",
      endTime: "19:00",
      consultantId: consultant.id,
    });

    const { availability } = await sut.execute({ id });

    expect(availability.id).toEqual(expect.any(String));
  });
});
