import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { AvailabilityRepository } from "@/repositories/availability-repository";
import { InMemoryAvailabilityRepository } from "@/repositories/in-memory/in-memory-availability-repository";
import { DeleteAvailabilityUseCase } from "./delete-availability";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { InMemoryConsultantsRepository } from "@/repositories/in-memory/in-memory-consultants-repository";
import { FindByConsultantIdUseCase } from "./filter-by-consultant-id";

let availabilityRepository: AvailabilityRepository;
let consultantRepository: ConsultantsRepository;
let sut: FindByConsultantIdUseCase;
describe("Find By Consultant Id Use Case", () => {
  beforeEach(() => {
    availabilityRepository = new InMemoryAvailabilityRepository();
    consultantRepository = new InMemoryConsultantsRepository();
    sut = new FindByConsultantIdUseCase(availabilityRepository);
  });

  it("should be able to list availabities by consultant id", async () => {
    const { id } = await consultantRepository.create({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await availabilityRepository.create({
      day: "25",
      startTime: "18:00",
      endTime: "19:00",
      consultantId: id,
    });

    await availabilityRepository.create({
      day: "25",
      startTime: "18:00",
      endTime: "19:00",
      consultantId: id,
    });

    const { availabilities } = await sut.execute({ id });

    expect(availabilities).toHaveLength(2);
  });
});
