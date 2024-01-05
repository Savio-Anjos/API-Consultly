import { Availability, Prisma } from "@prisma/client";
import { AvailabilityRepository } from "../availability-repository";
import { randomUUID } from "crypto";

export class InMemoryAvailabilityRepository implements AvailabilityRepository {
  public itens: Availability[] = [];

  public async create(
    data: Prisma.AvailabilityUncheckedCreateInput
  ): Promise<Availability> {
    const availability = {
      id: randomUUID(),
      day: data.day,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      consultantId: data.consultantId,
    };

    this.itens.push(availability);

    return availability;
  }
}
