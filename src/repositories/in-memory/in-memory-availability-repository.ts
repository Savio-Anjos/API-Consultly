import { Availability, Prisma } from "@prisma/client";
import { AvailabilityRepository } from "../availability-repository";
import { randomUUID } from "crypto";

export class InMemoryAvailabilityRepository implements AvailabilityRepository {
  public items: Availability[] = [];

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

    this.items.push(availability);

    return availability;
  }

  public async findByConsultantId(id: string): Promise<Availability[]> {
    const availabities = this.items.filter((item) => item.consultantId === id);

    return availabities;
  }

  public async delete(id: string): Promise<Availability[]> {
    const indexToRemove = this.items.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      this.items.splice(indexToRemove, 1);
    }

    return this.items;
  }
}
