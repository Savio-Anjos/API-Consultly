import { Availability } from "@prisma/client";
import { AvailabilityRepository } from "@/repositories/availability-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteAvailabilityUseCaseRequest {
  id: string;
}

interface DeleteAvailabilityUseCaseResponse {
  availability: Availability;
}

export class DeleteAvailabilityUseCase {
  constructor(private availabilityRepository: AvailabilityRepository) {}

  public async execute({
    id,
  }: DeleteAvailabilityUseCaseRequest): Promise<DeleteAvailabilityUseCaseResponse> {
    const availability = await this.availabilityRepository.delete(id);

    if (!availability) {
      throw new ResourceNotFoundError();
    }

    return { availability };
  }
}
