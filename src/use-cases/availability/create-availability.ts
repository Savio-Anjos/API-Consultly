import { Availability, User } from "@prisma/client";
import { UsersRepository } from "./../../repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { AvailabilityRepository } from "@/repositories/availability-repository";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface CreateAvailabilityUseCaseRequest {
  day: string;
  startTime: string | Date;
  endTime: string | Date;
  consultantId: string;
}

interface CreateAvailabilityUseCaseResponse {
  availability: Availability;
}

export class CreateUserUseCase {
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

    if (consultant) {
      throw new ResourceNotFoundError();
    }

    const availability = await this.availabilityRepository.create({
      day,
      startTime,
      endTime,
      consultantId,
    });

    if (!availability) {
      throw new ResourceNotFoundError();
    }

    return { availability };
  }
}
