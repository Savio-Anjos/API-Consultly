import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "../users/authenticate-user";

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUserRepository();
  const useCase = new AuthenticateUserUseCase(usersRepository);

  return useCase;
}
