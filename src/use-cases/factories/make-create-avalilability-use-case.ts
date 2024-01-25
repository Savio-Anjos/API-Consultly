import { PrismaAvailabilityRepository } from "@/repositories/prisma/prisma-availability-repository";
import { PrismaConsultantsRepository } from "@/repositories/prisma/prisma-consultants-repository";
import { CreateAvailabilityUseCase } from "../availability/create-availability";

export function makeCreateAvailabilityUseCase() {
  const consultantRepository = new PrismaConsultantsRepository();
  const availabilityRepository = new PrismaAvailabilityRepository();
  const useCase = new CreateAvailabilityUseCase(
    consultantRepository,
    availabilityRepository
  );

  return useCase;
}
