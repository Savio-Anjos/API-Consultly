import { Availability } from "@prisma/client";
import { AvailabilityRepository } from "@/repositories/availability-repository";

interface DeleteAvailabilityUseCaseRequest {
  id: string;
}

interface DeleteAvailabilityUseCaseResponse {
  availabilities: Availability[];
}

export class DeleteAvailabilityUseCase {
  constructor(private availabilityRepository: AvailabilityRepository) {}

  public async execute({
    id,
  }: DeleteAvailabilityUseCaseRequest): Promise<DeleteAvailabilityUseCaseResponse> {
    const availabilities = await this.availabilityRepository.delete(id);

    return { availabilities };
  }
}
