import { ListUserMeetingsUseCase } from "../meetings/list-user-meetings";
import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository";

export function makeListUserAndConsultantMeetingsUseCase() {
  const meetingsRepository = new PrismaMeetingsRepository();
  const useCase = new ListUserMeetingsUseCase(meetingsRepository);

  return useCase;
}
