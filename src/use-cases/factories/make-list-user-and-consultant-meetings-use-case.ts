import { ListUserAndConsultantMeetingsUseCase } from "../meetings/list-user-and-consultant-meetings";
import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository";

export function makeListUserAndConsultantMeetingsUseCase() {
  const meetingsRepository = new PrismaMeetingsRepository();
  const useCase = new ListUserAndConsultantMeetingsUseCase(meetingsRepository);

  return useCase;
}
