import { Availability } from "@prisma/client";
import { AvailabilityRepository } from "@/repositories/availability-repository";

interface getAvailabilityDetailsUseCaseRequest {
  id: string;
}

interface getAvailabilityDetailsUseCaseResponse {
  availabilities: Availability[];
}

export class GetAvailabilityDetailsUseCase {
  constructor(private availabilityRepository: AvailabilityRepository) {}

  public async execute({
    id,
  }: getAvailabilityDetailsUseCaseRequest): Promise<getAvailabilityDetailsUseCaseResponse> {
    const availabilities = await this.availabilityRepository.findByConsultantId(
      id
    );

    return { availabilities };
  }
}
