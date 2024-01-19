import { Availability } from "@prisma/client";
import { AvailabilityRepository } from "@/repositories/availability-repository";

interface FindByConsultantIdUseCaseRequest {
  id: string;
}

interface FindByConsultantIdUseCaseResponse {
  availabilities: Availability[];
}

export class FindByConsultantIdUseCase {
  constructor(private availabilityRepository: AvailabilityRepository) {}

  public async execute({
    id,
  }: FindByConsultantIdUseCaseRequest): Promise<FindByConsultantIdUseCaseResponse> {
    const availabilities = await this.availabilityRepository.findByConsultantId(
      id
    );

    return { availabilities };
  }
}
