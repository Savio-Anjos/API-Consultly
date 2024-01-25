import { Meeting } from "@prisma/client";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteMeetingUseCaseRequest {
  id: string;
}

interface DeleteMeetingUseCaseResponse {
  meeting: Meeting;
}

export class DeleteMeetingUseCase {
  constructor(private meetingsRepository: MeetingsRepository) {}

  public async execute({
    id,
  }: DeleteMeetingUseCaseRequest): Promise<DeleteMeetingUseCaseResponse> {
    const meeting = await this.meetingsRepository.delete(id);

    if (!meeting) {
      throw new ResourceNotFoundError();
    }

    return { meeting };
  }
}
