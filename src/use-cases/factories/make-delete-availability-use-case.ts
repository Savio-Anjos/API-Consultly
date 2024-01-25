import { PrismaAvailabilityRepository } from "@/repositories/prisma/prisma-availability-repository";
import { DeleteAvailabilityUseCase } from "../availability/delete-availability";

export function makeDeleteAvailabilityUseCase() {
  const availabilityRepository = new PrismaAvailabilityRepository();
  const useCase = new DeleteAvailabilityUseCase(availabilityRepository);

  return useCase;
}
