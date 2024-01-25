import { PrismaAvailabilityRepository } from "@/repositories/prisma/prisma-availability-repository";
import { GetAvailabilitiesUseCase } from "../availability/get-availabilities";

export function makeGetAvailabilitiesUseCase() {
  const availabilityRepository = new PrismaAvailabilityRepository();
  const useCase = new GetAvailabilitiesUseCase(availabilityRepository);

  return useCase;
}
