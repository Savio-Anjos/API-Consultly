import { Availability, Prisma } from "@prisma/client";
import { AvailabilityRepository } from "../availability-repository";
import { randomUUID } from "crypto";

export class InMemoryAvailabilityRepository implements AvailabilityRepository {
  public items: Availability[] = [] as Availability[];

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

  public async delete(id: string): Promise<Availability | null> {
    const indexToRemove = this.items.findIndex((item) => item.id === id);

    let availability: Availability | null;

    if (indexToRemove !== -1) {
      availability = this.items.splice(indexToRemove, 1)[0];
    } else {
      availability = null;
    }

    return availability;
  }

  public async findByConsultantId(id: string): Promise<Availability[]> {
    const availabities = this.items.filter((item) => item.consultantId === id);

    return availabities;
  }
}
