import { Availability, Prisma } from "@prisma/client";
import { AvailabilityRepository } from "../availability-repository";

export class InMemoryAvailabilityRepository implements AvailabilityRepository {
  create(data: Prisma.AvailabilityCreateInput): Promise<Availability> {
    throw new Error("Method not implemented.");
  }
}
