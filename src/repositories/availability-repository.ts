import { Availability, Prisma, User } from "@prisma/client";

export interface AvailabilityRepository {
  create(data: Prisma.AvailabilityCreateInput): Promise<Availability>;
}
