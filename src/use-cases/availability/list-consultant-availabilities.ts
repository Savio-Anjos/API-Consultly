import { Availability } from "@prisma/client";
import { AvailabilityRepository } from "@/repositories/availability-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ListConsultantAvailabilitiesUseCaseRequest {
  id: string;
}

interface ListConsultantAvailabilitiesUseCaseResponse {
  availabilities: Availability[];
}

export class ListConsultantAvailabilitiesUseCase {
  constructor(private availabilityRepository: AvailabilityRepository) {}

  public async execute({
    id,
  }: ListConsultantAvailabilitiesUseCaseRequest): Promise<ListConsultantAvailabilitiesUseCaseResponse> {
    const availabilities = await this.availabilityRepository.findByConsultantId(
      id
    );

    if (!availabilities) {
      throw new ResourceNotFoundError();
    }

    return { availabilities };
  }
}
