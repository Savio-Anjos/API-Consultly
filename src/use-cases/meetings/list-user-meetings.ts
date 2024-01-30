import { Meeting } from "@prisma/client";
import { MeetingsRepository } from "@/repositories/meetings-repository";

interface ListUserMeetingsUseCaseRequest {
  userId: string;
}

interface ListUserMeetingsUseCaseResponse {
  meetings: Meeting[];
}

export class ListUserMeetingsUseCase {
  constructor(private meetingsRepository: MeetingsRepository) {}

  public async execute({
    userId,
  }: ListUserMeetingsUseCaseRequest): Promise<ListUserMeetingsUseCaseResponse> {
    const meetings = await this.meetingsRepository.findByUserId(userId);

    return { meetings };
  }
}
