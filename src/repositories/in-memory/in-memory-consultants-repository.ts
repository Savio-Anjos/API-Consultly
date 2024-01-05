import { Consultant, Prisma } from "@prisma/client";
import { ConsultantsRepository } from "../consultants-repository";
import { randomUUID } from "crypto";

export class InMemoryConsultantsRepository implements ConsultantsRepository {
  public itens: Consultant[] = [];

  public async create(data: Prisma.ConsultantCreateInput): Promise<Consultant> {
    const consultant = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    };

    this.itens.push(consultant);

    return consultant;
  }

  public async findById(id: string): Promise<Consultant | null> {
    const consultant = this.itens.find((item) => item.id === id);

    if (!consultant) {
      return null;
    }

    return consultant;
  }

  public async findByEmail(email: string): Promise<Consultant | null> {
    const consultant = this.itens.find((item) => item.email === email);

    if (!consultant) {
      return null;
    }

    return consultant;
  }
}
