import { Consultant, Prisma } from "@prisma/client";

export interface ConsultantsRepository {
  create(data: Prisma.ConsultantCreateInput): Promise<Consultant>;
}
