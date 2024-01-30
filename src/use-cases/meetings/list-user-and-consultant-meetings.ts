import { Meeting } from "@prisma/client";
import { MeetingsRepository } from "@/repositories/meetings-repository";

interface ListUserAndConsultantMeetingsUseCaseRequest {
  userId: string;
  consultantId: string;
}

interface ListUserAndConsultantMeetingsUseCaseResponse {
  meetings: Meeting[];
}

export class ListUserAndConsultantMeetingsUseCase {
  constructor(private meetingsRepository: MeetingsRepository) {}

  public async execute({
    userId,
    consultantId,
  }: ListUserAndConsultantMeetingsUseCaseRequest): Promise<ListUserAndConsultantMeetingsUseCaseResponse> {
    const meetings = await this.meetingsRepository.findByUserIdAndConsultantId(
      userId,
      consultantId
    );

    return { meetings };
  }
}
