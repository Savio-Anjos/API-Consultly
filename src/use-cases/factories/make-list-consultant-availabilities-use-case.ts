import { PrismaAvailabilityRepository } from "@/repositories/prisma/prisma-availability-repository";
import { ListConsultantAvailabilitiesUseCase } from "../availability/list-consultant-availabilities";

export function makeListConsultantAvailabilitiesUseCase() {
  const availabilityRepository = new PrismaAvailabilityRepository();
  const useCase = new ListConsultantAvailabilitiesUseCase(
    availabilityRepository
  );

  return useCase;
}
