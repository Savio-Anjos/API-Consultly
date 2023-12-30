import { Consultant, Prisma } from "@prisma/client";
import { ConsultantsRepository } from "../consultants-repository";

export class InMemoryConsultantsRepository implements ConsultantsRepository {
  create(data: Prisma.ConsultantCreateInput): Promise<Consultant> {
    throw new Error("Method not implemented.");
  }
}
