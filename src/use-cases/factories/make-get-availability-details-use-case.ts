import { PrismaAvailabilityRepository } from "@/repositories/prisma/prisma-availability-repository";
import { GetAvailabilityDetailsUseCase } from "../availability/get-availability-details";

export function makeGetAvailabilityDetailsUseCase() {
  const availabilityRepository = new PrismaAvailabilityRepository();
  const useCase = new GetAvailabilityDetailsUseCase(availabilityRepository);

  return useCase;
}
