import { Availability } from "@prisma/client";
import { AvailabilityRepository } from "@/repositories/availability-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface getAvailabilitiesUseCaseRequest {
  id: string;
}

interface getAvailabilitiesUseCaseResponse {
  availabilities: Availability[];
}

export class GetAvailabilitiesUseCase {
  constructor(private availabilityRepository: AvailabilityRepository) {}

  public async execute({
    id,
  }: getAvailabilitiesUseCaseRequest): Promise<getAvailabilitiesUseCaseResponse> {
    const availabilities = await this.availabilityRepository.findByConsultantId(
      id
    );

    if (!availabilities) {
      throw new ResourceNotFoundError();
    }

    return { availabilities };
  }
}
