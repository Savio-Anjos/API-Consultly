import { CreateConsultantUseCase } from "../consultants/create-consultant";
import { PrismaConsultantsRepository } from "@/repositories/prisma/prisma-consultants-repository";

export function makeCreateConsultantUseCase() {
  const consultantRepository = new PrismaConsultantsRepository();
  const useCase = new CreateConsultantUseCase(consultantRepository);

  return useCase;
}
