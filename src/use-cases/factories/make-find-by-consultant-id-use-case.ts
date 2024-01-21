import { PrismaAvailabilityRepository } from "@/repositories/prisma/prisma-availability-repository";
import { FindByConsultantIdUseCase } from "../availability/find-by-consultant-id";

export function makeFindByConsultantIdUseCase() {
  const availabilityRepository = new PrismaAvailabilityRepository();
  const useCase = new FindByConsultantIdUseCase(availabilityRepository);

  return useCase;
}
