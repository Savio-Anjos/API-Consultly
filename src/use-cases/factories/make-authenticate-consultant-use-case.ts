import { AuthenticateConsultantUseCase } from "../consultants/authenticate-consultant";
import { PrismaConsultantsRepository } from "@/repositories/prisma/prisma-consultants-repository";

export function makeAuthenticateConsultantUseCase() {
  const consultantRepository = new PrismaConsultantsRepository();
  const useCase = new AuthenticateConsultantUseCase(consultantRepository);

  return useCase;
}
