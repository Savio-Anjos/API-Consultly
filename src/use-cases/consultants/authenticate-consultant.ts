import { Consultant } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { ConsultantsRepository } from "@/repositories/consultants-repository";

interface AuthenticateConsultantUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateConsultantUseCaseResponse {
  consultant: Consultant;
}

export class AuthenticateConsultantUseCase {
  constructor(private consultantRepository: ConsultantsRepository) {}

  public async execute({
    email,
    password,
  }: AuthenticateConsultantUseCaseRequest): Promise<AuthenticateConsultantUseCaseResponse> {
    const consultant = await this.consultantRepository.findByEmail(email);

    if (!consultant) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatchs = await compare(
      password,
      consultant.password_hash
    );

    if (!doesPasswordMatchs) {
      throw new InvalidCredentialsError();
    }

    return { consultant };
  }
}
