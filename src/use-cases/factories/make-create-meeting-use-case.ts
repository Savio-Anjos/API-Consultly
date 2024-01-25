import { PrismaConsultantsRepository } from "@/repositories/prisma/prisma-consultants-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateMeetingUseCase } from "../meetings/create-meeting";
import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository";

export function makeCreateMeetingUseCase() {
  const usersRepository = new PrismaUserRepository();
  const consultantRepository = new PrismaConsultantsRepository();
  const meetingsRepository = new PrismaMeetingsRepository();
  const useCase = new CreateMeetingUseCase(
    usersRepository,
    consultantRepository,
    meetingsRepository
  );

  return useCase;
}
