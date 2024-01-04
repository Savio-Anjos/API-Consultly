import { User } from "@prisma/client";
import { UsersRepository } from "./../../repositories/users-repository";
import { compare, hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserAlreadyExistsError();
    }

    const doesPasswordMatchs = compare(password, user.password_hash);

    if (!doesPasswordMatchs) {
    }

    return { user };
  }
}
