import { Consultant, Prisma } from "@prisma/client";

export interface ConsultantsRepository {
  create(data: Prisma.ConsultantCreateInput): Promise<Consultant>;
  findById(id: string): Promise<Consultant | null>;
  findByEmail(email: string): Promise<Consultant | null>;
}
