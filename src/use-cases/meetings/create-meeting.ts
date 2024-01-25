import { Meeting } from "@prisma/client";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateMeetingUseCaseRequest {
  startTime: string;
  endTime: string;
  userId: string;
  consultantId: string;
}

interface CreateMeetingUseCaseResponse {
  meeting: Meeting;
}

export class CreateMeetingUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private consultantsRepository: ConsultantsRepository,
    private meetingsRepository: MeetingsRepository
  ) {}

  public async execute({
    startTime,
    endTime,
    userId,
    consultantId,
  }: CreateMeetingUseCaseRequest): Promise<CreateMeetingUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);
    const consultant = await this.consultantsRepository.findById(consultantId);

    if (!user || !consultant) {
      throw new ResourceNotFoundError();
    }

    const title = `Meeting - ${user.name} - ${consultant.name}`;

    const formattedStartTime = new Date(startTime).toISOString();
    const formattedEndTime = new Date(endTime).toISOString();

    const meeting = await this.meetingsRepository.create({
      title,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      userId,
      consultantId,
    });

    return { meeting };
  }
}
