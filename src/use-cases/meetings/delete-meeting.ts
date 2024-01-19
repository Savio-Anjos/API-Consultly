import { Meeting } from "@prisma/client";
import { MeetingsRepository } from "@/repositories/meetings-repository";

interface DeleteMeetingUseCaseRequest {
  id: string;
}

interface DeleteMeetingUseCaseResponse {
  meetings: Meeting[];
}

export class DeleteMeetingUseCase {
  constructor(private meetingsRepository: MeetingsRepository) {}

  public async execute({
    id,
  }: DeleteMeetingUseCaseRequest): Promise<DeleteMeetingUseCaseResponse> {
    const meetings = await this.meetingsRepository.delete(id);

    return { meetings };
  }
}
