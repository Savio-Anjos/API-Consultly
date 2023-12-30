import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
