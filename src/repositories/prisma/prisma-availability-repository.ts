import { Availability, Prisma } from "@prisma/client";
import { AvailabilityRepository } from "../availability-repository";
import { prisma } from "@/lib/prisma";

export class PrismaAvailabilityRepository implements AvailabilityRepository {
  public async create(
    data: Prisma.AvailabilityUncheckedCreateInput
  ): Promise<Availability> {
    const availability = await prisma.availability.create({
      data,
    });

    return availability;
  }
  public async delete(id: string): Promise<Availability | null> {
    const availability = await prisma.availability.delete({
      where: {
        id,
      },
    });

    return availability;
  }
  public async findByConsultantId(id: string): Promise<Availability[]> {
    const availabilities = await prisma.availability.findMany({
      where: {
        consultantId: id,
      },
    });

    return availabilities;
  }
}
