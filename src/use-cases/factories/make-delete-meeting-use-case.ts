import { PrismaMeetingsRepository } from "@/repositories/prisma/prisma-meetings-repository";
import { DeleteMeetingUseCase } from "../meetings/delete-meeting";

export function makeDeleteMeetingUseCase() {
  const meetingsRepository = new PrismaMeetingsRepository();
  const useCase = new DeleteMeetingUseCase(meetingsRepository);

  return useCase;
}
