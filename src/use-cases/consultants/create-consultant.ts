import { Consultant } from "@prisma/client";
import { hash } from "bcryptjs";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { ConsultantAlreadyExistsError } from "../errors/consultant-already-exists-error";

interface CreateConsultantUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateConsultantUseCaseResponse {
  consultant: Consultant;
}

export class CreateConsultantUseCase {
  constructor(private consultantsRepository: ConsultantsRepository) {}

  public async execute({
    name,
    email,
    password,
  }: CreateConsultantUseCaseRequest): Promise<CreateConsultantUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const consultant = await this.consultantsRepository.create({
      name,
      email,
      password_hash,
    });

    if (!consultant) {
      throw new ConsultantAlreadyExistsError();
    }

    return { consultant };
  }
}
