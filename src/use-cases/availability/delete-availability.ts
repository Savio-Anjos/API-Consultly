import { Availability } from "@prisma/client";
import { AvailabilityRepository } from "@/repositories/availability-repository";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

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
