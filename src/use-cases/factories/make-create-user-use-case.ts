import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "../users/create-user";

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUserRepository();
  const useCase = new CreateUserUseCase(usersRepository);

  return useCase;
}
