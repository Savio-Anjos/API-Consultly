import { ListConsultantMeetingsUseCase } from "../meetings/list-consultant-meetings";
import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository";

export function makeListConsultantMeetingsUseCase() {
  const meetingsRepository = new PrismaMeetingsRepository();
  const useCase = new ListConsultantMeetingsUseCase(meetingsRepository);

  return useCase;
}
