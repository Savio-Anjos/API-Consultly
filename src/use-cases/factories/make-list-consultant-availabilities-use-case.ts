import { PrismaAvailabilityRepository } from "@/repositories/prisma/prisma-availability-repository";
import { ListConsultantAvailabilitiesUseCase } from "../availability/list-consultant-availabilities";

export function makeGetAvailabilitiesUseCase() {
  const availabilityRepository = new PrismaAvailabilityRepository();
  const useCase = new ListConsultantAvailabilitiesUseCase(
    availabilityRepository
  );

  return useCase;
}
