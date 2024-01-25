import { Consultant, Prisma } from "@prisma/client";
import { ConsultantsRepository } from "../consultants-repository";
import { prisma } from "@/lib/prisma";

export class PrismaConsultantsRepository implements ConsultantsRepository {
  public async create(data: Prisma.ConsultantCreateInput): Promise<Consultant> {
    const consultant = await prisma.consultant.create({
      data,
    });

    return consultant;
  }
  public async findById(id: string): Promise<Consultant | null> {
    const consultant = await prisma.consultant.findUnique({
      where: {
        id,
      },
    });

    return consultant;
  }
  public async findByEmail(email: string): Promise<Consultant | null> {
    const consultant = await prisma.consultant.findUnique({
      where: {
        email,
      },
    });

    return consultant;
  }
}
