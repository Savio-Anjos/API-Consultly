import { Meeting } from "@prisma/client";
import { MeetingsRepository } from "@/repositories/meetings-repository";

interface ListConsultantMeetingsUseCaseRequest {
  consultantId: string;
}

interface ListConsultantMeetingsUseCaseResponse {
  meetings: Meeting[];
}

export class ListConsultantMeetingsUseCase {
  constructor(private meetingsRepository: MeetingsRepository) {}

  public async execute({
    consultantId,
  }: ListConsultantMeetingsUseCaseRequest): Promise<ListConsultantMeetingsUseCaseResponse> {
    const meetings = await this.meetingsRepository.findByConsultantId(
      consultantId
    );

    return { meetings };
  }
}
