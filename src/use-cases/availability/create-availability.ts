import { Availability } from "@prisma/client";
import { AvailabilityRepository } from "@/repositories/availability-repository";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateAvailabilityUseCaseRequest {
  day: string;
  startTime: string | Date;
  endTime: string | Date;
  consultantId: string;
}

interface CreateAvailabilityUseCaseResponse {
  availability: Availability;
}

export class CreateAvailabilityUseCase {
  constructor(
    private consultantRepository: ConsultantsRepository,
    private availabilityRepository: AvailabilityRepository
  ) {}

  public async execute({
    day,
    startTime,
    endTime,
    consultantId,
  }: CreateAvailabilityUseCaseRequest): Promise<CreateAvailabilityUseCaseResponse> {
    const consultant = await this.consultantRepository.findById(consultantId);

    if (!consultant) {
      throw new ResourceNotFoundError();
    }

    const formattedStartTime = new Date(startTime).toISOString();
    const formattedEndTime = new Date(endTime).toISOString();

    const availability = await this.availabilityRepository.create({
      day,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      consultantId,
    });

    return { availability };
  }
}
